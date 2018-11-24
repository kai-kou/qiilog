package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/endpoints"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/uetchy/go-qiita/qiita"
	"golang.org/x/oauth2"
)

type Response struct {
	Message string `json:"message"`
}

func Handler() (Response, error) {
	token := os.Getenv("QIITA_ACCESS_TOKEN")
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
	tc := oauth2.NewClient(oauth2.NoContext, ts)
	client := qiita.NewClient(tc)
	user, err := client.AuthenticatedUser.Show()
	if err != nil {
		fmt.Println("Get user error:", err)
		return Response{
			Message: "Get user error",
		}, err
	}

	fmt.Println(user)

	opt := &qiita.ListOptions{Page: 1, PerPage: 100}
	items, _, err := client.AuthenticatedUser.Items(opt)
	if err != nil {
		fmt.Println("Get items error:", err)
		return Response{
			Message: "Get items error",
		}, err
	}

	// fmt.Println(items)

	jsonBytes, err := json.Marshal(items)
	if err != nil {
		fmt.Println("JSON Marshal error:", err)
		return Response{
			Message: "JSON Marshal error",
		}, err
	}

	out := new(bytes.Buffer)
	json.Indent(out, jsonBytes, "", "")
	jsonStr := out.String()

	var BUCKET = os.Getenv("BUCKET")
	var KEY = os.Getenv("KEY")
	svc := s3.New(session.New(), &aws.Config{
		Region: aws.String(endpoints.ApNortheast1RegionID),
	})

	wb := new(bytes.Buffer)
	fmt.Fprint(wb, jsonStr)
	_, errpo := svc.PutObject(&s3.PutObjectInput{
		Body:                 bytes.NewReader(wb.Bytes()),
		Bucket:               aws.String(BUCKET),
		Key:                  aws.String(KEY),
		ACL:                  aws.String("private"),
		ContentType:          aws.String("application/json"),
		ServerSideEncryption: aws.String("AES256"),
	})

	if errpo != nil {
		if aerr, ok := errpo.(awserr.Error); ok {
			log.Printf("aws error %v at PutObject", aerr.Error())
			return Response{
				Message: "aws error at PutObject",
			}, aerr
		}
		log.Printf("error %v at PutObject", errpo.Error())
		return Response{
			Message: "error %v at PutObject",
		}, errpo
	}
	defer log.Print("normal end")

	for _, item := range items {
		jsonItemBytes, err := json.Marshal(item)
		if err != nil {
			fmt.Println("JSON Marshal error:", err)
			return Response{
				Message: "JSON Marshal error",
			}, err
		}

		outItem := new(bytes.Buffer)
		json.Indent(outItem, jsonItemBytes, "", "")
		jsonItemStr := outItem.String()
		wbItem := new(bytes.Buffer)
		fmt.Fprint(wbItem, jsonItemStr)
		itemKey := "items/" + item.Id + ".json"
		_, errpo := svc.PutObject(&s3.PutObjectInput{
			Body:                 bytes.NewReader(wbItem.Bytes()),
			Bucket:               aws.String(BUCKET),
			Key:                  aws.String(itemKey),
			ACL:                  aws.String("private"),
			ContentType:          aws.String("application/json"),
			ServerSideEncryption: aws.String("AES256"),
		})
		if errpo != nil {
			if aerr, ok := errpo.(awserr.Error); ok {
				log.Printf("aws error %v at PutObject", aerr.Error())
				return Response{
					Message: "aws error at PutObject",
				}, aerr
			}
			log.Printf("error %v at PutObject", errpo.Error())
			return Response{
				Message: "error %v at PutObject",
			}, errpo
		}
	}

	return Response{
		Message: "Go Serverless v1.0! Your function executed successfully!",
	}, nil
}

func main() {
	lambda.Start(Handler)
}
