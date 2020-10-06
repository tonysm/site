package main

import (
    "net/http"
    "errors"
    "html/template"
    "io"
    "github.com/labstack/echo"
)

// Define the template registry struct
type TemplateRegistry struct {
  templates map[string]*template.Template
}

// Implement e.Renderer interface
func (t *TemplateRegistry) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
  tmpl, ok := t.templates[name]
  if !ok {
    err := errors.New("Template not found -> " + name)
    return err
  }
  return tmpl.ExecuteTemplate(w, "layout.html", data)
}

func main() {
  // Echo instance
  e := echo.New()

  templates := make(map[string]*template.Template)
  templates["index.html"] = template.Must(template.ParseFiles("templates/index.html", "templates/layout.html"))
  templates["sobre.html"] = template.Must(template.ParseFiles("templates/sobre.html", "templates/layout.html"))
  templates["sou-candidato.html"] = template.Must(template.ParseFiles("templates/sou-candidato.html", "templates/layout.html"))
  e.Renderer = &TemplateRegistry{
    templates: templates,
  }

  e.GET("/", Home)
  e.GET("/sobre", Sobre)
  e.GET("/sou-candidato", SouCandidato)

  e.Logger.Fatal(e.Start(":1323"))
}

func Home(c echo.Context) error {
    return c.Render(http.StatusOK, "index.html", map[string]interface{}{
        "title": "Tela inicial",
    })
}

func Sobre(c echo.Context) error {
    return c.Render(http.StatusOK, "sobre.html", map[string]interface{}{
        "title": "Sobre",
    })
}

func SouCandidato(c echo.Context) error {
    return c.Render(http.StatusOK, "sou-candidato.html", map[string]interface{}{
        "title": "Sou Candidato",
    })
}
