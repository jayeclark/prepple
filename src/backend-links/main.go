package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"

	"github.com/jayeclark/prepple/dao"
	"github.com/jayeclark/prepple/dto"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func returnUrlHashcode(w http.ResponseWriter, r *http.Request) {
	urlElements := strings.Split(r.URL.Path, "/")
	ttlString := r.URL.Query().Get("ttl")
	resourceType := urlElements[0]
	resourceId := urlElements[1]
	timestamp := time.Now().Unix()
	string_to_hash := resourceId + fmt.Sprint(timestamp)

	urlHashBytes := sha2560f((string_to_hash))
	generatedNumber := new(big.Int).SetBytes(urlHashBytes).Uint64()
	finalUrl := base58Encoded([]byte(fmt.Sprintf("%d", generatedNumber)))

	// Save to DDB
	ttl, err := strconv.ParseInt(ttlString, 10, 64)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	dto := dto.ShortLink{
		Url:           finalUrl,
		Resource_id:   resourceId,
		Resource_type: resourceType,
		Ttl:           ttl}

	// Send dto to dynamodb
	var item map[string]types.AttributeValue
	data, _ := json.Marshal(dto)
	json.Unmarshal(data, &item)
	tableName := os.Getenv("DDB_TABLE_NAME")

	output := dao.SaveSingleItem(item, &tableName)

	// Return
	fmt.Println(output)
	json.NewEncoder(w).Encode(finalUrl)
}

func newShortLink(finalUrl, resourceId, resourceType, ttl string) {
	panic("unimplemented")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":10000", nil))
}

func main() {
	handleRequests()
}
