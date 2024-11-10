import React, { createContext, useContext } from 'react'

const CrimeContext = createContext()

export default function CrimeProvider({children}) {
    
    const crimeCategories = [
        {
        category: "Violent Crime (Bayolenteng Krimen)",
        types: [
            "Homicide (Pagpatay)",
            "Assault (Pananakit)",
            "Robbery (Pagnanakaw sa Pamamagitan ng Dahas)",
            "Sexual Assault (Panghahalay)",
        ],
        },
        {
        category: "Property Crime (Krimen sa Ari-arian)",
        types: [
            "Burglary (Pagnanakaw sa Bahay)",
            "Theft (Pagnanakaw)",
            "Arson (Panununog)",
            "Motor Vehicle Theft (Pagnanakaw ng Sasakyan)",
        ],
        },
        {
        category: "White-Collar Crime (Krimen ng mga Nasa Katungkulan)",
        types: [
            "Embezzlement (Paglustay ng Pondo)",
            "Securities Fraud (Panlilinlang sa Pamumuhunan)",
            "Money Laundering (Paghuhugas ng Pera)",
            "Insider Trading (Lihim na Kalakal)",
        ],
        },
        {
        category: "Organized Crime (Organisadong Krimen)",
        types: [
            "Drug Trafficking (Kalakalan ng Droga)",
            "Human Trafficking (Kalakalan ng Tao)",
            "Illegal Gambling Operations (Iligal na Pagsusugal)",
            "Extortion (Pangingikil)",
        ],
        },
        {
        category: "Consensual or Victimless Crime (Kasunduang Krimen o Krimen na Walang Biktima)",
        types: [
            "Prostitution (Prostitusyon)",
            "Drug Use (Paggamit ng Droga)",
            "Illegal Gambling (Iligal na Pagsusugal)",
            "Public Drunkenness (Paglalasing sa Pampublikong Lugar)",
        ],
        },
    ]

    const municipality = [
        {
            municipality: "Tarlac City",
            barangays: [
                "Aguso",
                "Alvindia",
                "Amucao",
                "Armenia",
                "Asturias",
                "Atioc",
                "Balingcanaway",
                "Banaba",
                "Bantog",
                "Baras-baras",
                "Batang-batang",
                "Binauganan",
                "Bora",
                "Buenavista",
                "Burot",
                "Calingcuan",
                "Capehan",
                "Carangian",
                "Care",
                "Catmon",
                "Culipat",
                "Cut-cut I",
                "Cut-cut II",
                "Dela Paz",
                "Dolores",
                "La Paz",
                "Ligtasan",
                "Lourdes",
                "Maligaya",
                "Mapalacsiao",
                "Mapalad",
                "Matatalaib",
                "Paraiso",
                "Poblacion",
                "Salapungan",
                "San Carlos",
                "San Francisco",
                "San Isidro",
                "San Jose",
                "San Juan De Mata",
                "San Luis",
                "San Manuel",
                "San Miguel",
                "San Nicolas",
                "San Pablo",
                "San Pascual",
                "San Pedro",
                "San Rafael",
                "San Roque",
                "San Sebastian",
                "Sapang Maragul",
                "Sapang Tagalog",
                "Suizo",
                "Tibag",
                "Trinidad",
                "Ungot",
                "Villa Bacolor",
                // Add any other barangays if needed
            ],
        },
        // {
        //     municipality: "Gerona",
        //     barangays: [
        //         "Abagon",
        //         "Apsayan",
        //         "Buenlag",
        //         "Burgos",
        //         "Calayaan",
        //         "Dicolor",
        //         "Don Basilio",
        //         "Gerona",
        //         "Matarannoc",
        //         "New Salem",
        //         "Padapada",
        //         "Poblacion 1",
        //         "Poblacion 2",
        //         "Poblacion 3",
        //         "Poblacion 4",
        //         "Quezon",
        //         "Rizal",
        //         "Salapungan",
        //         "San Agustin",
        //         "San Antonio",
        //         "San Bartolome",
        //         "San Jose",
        //         "San Juan",
        //         "San Vicente",
        //         "Santa Ana",
        //         "Santa Lucia",
        //         "Santa Rita",
        //         "Santo Cristo",
        //         "Santo Niño",
        //         "Tagumbao",
        //         "Telabanca",
        //         "Villa Paz",
        //         // Add any other barangays if needed
        //     ],
        // },
    ];
    return (
        <CrimeContext.Provider value={{ crimeCategories, municipality }} >
            {children}
        </CrimeContext.Provider>
    )
}

export const useCrimeContext = () => useContext(CrimeContext)