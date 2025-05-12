package domain

type About struct {
	Name      string      `json:"name"`
	Title     string      `json:"title"`
	Bio       string      `json:"bio"`
	Skills    Skills      `json:"skills"`
	Education []Education `json:"education"`
}

type Skills struct {
	Languages  []string `json:"languages"`
	Frameworks []string `json:"frameworks"`
	Others     []string `json:"tools"`
}

type Education struct {
	Degree      string `json:"degree"`
	Institution string `json:"institution"`
	Year        string `json:"year"`
}
