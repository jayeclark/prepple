package dao

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

func SaveSingleItem(item map[string]types.AttributeValue, tableName *string) *dynamodb.PutItemOutput {
	client := DdbClient()
	output, err := client.PutItem(context.TODO(), &dynamodb.PutItemInput{
		Item:      item,
		TableName: tableName,
	})

	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	return output
}
