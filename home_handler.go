package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/candidatos-info/site/db"
	"github.com/labstack/echo"
)

//  in the format they are going to be presented in UI
var (
	uiRoles  = map[string]string{"vereador": "Vereador(a)", "prefeito": "Prefeito(a)", "vice-prefeito": "Vice Prefeito(a)"}
	uiStates = map[string]string{"AL": "Alagoas"}
)

type homeFilter struct {
	State    string
	Year     string
	City     string
	Role     string
	Tag      string
	NextPage int
}

func buildLoadMoreURL(filter *homeFilter) string {
	query := map[string]string{
		"estado": filter.State,
		"ano":    filter.Year,
		"cidade": filter.City,
		"cargo":  filter.Role,
	}

	var url string
	for key, val := range query {
		url = url + "&" + fmt.Sprintf("%s=%s", key, val)
	}

	return "?" + strings.Trim(url, "&") + "&page=" + strconv.Itoa(filter.NextPage)
}

func newHomeHandler(db *db.Client) echo.HandlerFunc {
	return func(c echo.Context) error {
		year := c.QueryParam("ano")
		if year == "" {
			year = strconv.Itoa(time.Now().Year())
		}

		candidates := []*candidateCard{}
		cities := []string{}
		page := 0
		state := c.QueryParam("estado")
		if state != "" {
			var err error
			cities, err = db.GetCities(state)
			if err != nil {
				log.Printf("error fetching cities from a state (%s):%q\n", state, err)
				return c.String(http.StatusInternalServerError, "erro buscando cidades.")
			}
			candidates, page, err = filterCandidates(c, db)
			// TODO: substituir por página de erro.
			if err != nil {
				log.Printf("error filtering candidates:%q", err)
				return c.String(http.StatusInternalServerError, "erro filtrando candidatos.")
			}
		}
		filter := &homeFilter{
			State:    state,
			City:     c.QueryParam("cidade"),
			Year:     year,
			Role:     c.QueryParam("cargo"),
			NextPage: page + 1,
			Tag:      c.QueryParam("tag"),
		}
		r := c.Render(http.StatusOK, "index.html", map[string]interface{}{
			"AllStates":     uiStates,
			"AllRoles":      uiRoles,
			"CitiesOfState": cities,
			"Filters":       filter,
			"Candidates":    candidates,
			"LoadMoreUrl":   buildLoadMoreURL(filter),
			"Tags":          tags,
		})
		fmt.Println(r)
		return r
	}
}
