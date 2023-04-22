package dao

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

func DdbClient() *dynamodb.Client {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	client := dynamodb.NewFromConfig(cfg)
	return client
}
