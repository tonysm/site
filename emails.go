package main

import (
	"fmt"
	"strings"

	"github.com/candidatos-info/descritor"
)

func buildProfileAccessEmail(candidate *descritor.CandidateForDB, accessToken string) string {
	var emailBodyBuilder strings.Builder
	emailBodyBuilder.WriteString(fmt.Sprintf("Olá, %s!<br>", candidate.Name))
	emailBodyBuilder.WriteString(fmt.Sprintf("para acessar seu perfil click no link: %s/profile?access_token=%s\n", siteURL, accessToken))
	return emailBodyBuilder.String()
}

func buildReportEmail(candidate *descritor.CandidateForDB, report string) string {
	var emailBodyBuilder strings.Builder
	emailBodyBuilder.WriteString(fmt.Sprintf("Nova denúcia do candidato %s: <br><br>", candidate.Name))
	emailBodyBuilder.WriteString(fmt.Sprintf("\n\n%s\n", report))
	return emailBodyBuilder.String()
}

func buildContactMessage(messageType, body string) string {
	var emailBodyBuilder strings.Builder
	emailBodyBuilder.WriteString(fmt.Sprintf("Nova mensagem do tipo %s: <br>", messageType))
	emailBodyBuilder.WriteString(fmt.Sprintf("\n\n%s\n", body))
	return emailBodyBuilder.String()
}
