interface FeastDay {
	name: string // English
	nameEl: string // Greek
	nameId: string // Indonesian
	julianMonth: number
	julianDay: number
	type: "great" | "major" | "minor" | "fast"
	fasting?: boolean
}

// ──────────────────────────────────────
// Fixed Feasts (Julian Calendar dates)
// ──────────────────────────────────────
export const FIXED_FEASTS: FeastDay[] = [
	// ══════════════════════════════════════
	// THE TWELVE GREAT FEASTS (Fixed)
	// ══════════════════════════════════════
	{
		name: "Nativity of the Theotokos",
		nameEl: "Γενέσιον τῆς Ὑπεραγίας Θεοτόκου",
		nameId: "Kelahiran Bunda Allah yang Mahasuci",
		julianMonth: 9,
		julianDay: 8,
		type: "great",
	},
	{
		name: "Exaltation of the Holy Cross",
		nameEl: "Ὕψωσις τοῦ Τιμίου Σταυροῦ",
		nameId: "Pemuliaan Salib Suci",
		julianMonth: 9,
		julianDay: 14,
		type: "great",
	},
	{
		name: "Presentation of the Theotokos",
		nameEl: "Εἴσοδος τῆς Ὑπεραγίας Θεοτόκου εἰς τὸν Ναόν",
		nameId: "Masuknya Bunda Allah ke dalam Bait Allah",
		julianMonth: 11,
		julianDay: 21,
		type: "great",
	},
	{
		name: "Nativity of our Lord Jesus Christ",
		nameEl: "Ἡ κατὰ Σάρκα Γέννησις τοῦ Κυρίου ἡμῶν Ἰησοῦ Χριστοῦ",
		nameId: "Kelahiran Tuhan Kita Yesus Kristus Menurut Daging",
		julianMonth: 12,
		julianDay: 25,
		type: "great",
	},
	{
		name: "Theophany — Baptism of our Lord",
		nameEl: "Τὰ Ἅγια Θεοφάνεια τοῦ Κυρίου ἡμῶν Ἰησοῦ Χριστοῦ",
		nameId: "Teofani — Pembaptisan Tuhan Kita Yesus Kristus",
		julianMonth: 1,
		julianDay: 6,
		type: "great",
	},
	{
		name: "Meeting of our Lord — Presentation in the Temple",
		nameEl: "Ἡ Ὑπαπαντὴ τοῦ Κυρίου ἡμῶν Ἰησοῦ Χριστοῦ",
		nameId: "Perjumpaan Tuhan — Persembahan di Bait Allah",
		julianMonth: 2,
		julianDay: 2,
		type: "great",
	},
	{
		name: "Annunciation of the Theotokos",
		nameEl: "Ὁ Εὐαγγελισμὸς τῆς Ὑπεραγίας Θεοτόκου",
		nameId: "Kabar Sukacita kepada Bunda Allah yang Mahasuci",
		julianMonth: 3,
		julianDay: 25,
		type: "great",
	},
	{
		name: "Transfiguration of our Lord",
		nameEl: "Ἡ Μεταμόρφωσις τοῦ Κυρίου ἡμῶν Ἰησοῦ Χριστοῦ",
		nameId: "Transfigurasi Tuhan Kita Yesus Kristus",
		julianMonth: 8,
		julianDay: 6,
		type: "great",
	},
	{
		name: "Dormition of the Theotokos",
		nameEl: "Ἡ Κοίμησις τῆς Ὑπεραγίας Θεοτόκου",
		nameId: "Peristirahatan Bunda Allah yang Mahasuci",
		julianMonth: 8,
		julianDay: 15,
		type: "great",
	},
	// Major Saints
	{
		name: "Circumcision of our Lord Jesus Christ",
		nameEl: "Ἡ κατὰ Σάρκα Περιτομή τοῦ Κυρίου ἡμῶν Ἰησοῦ Χριστοῦ",
		nameId: "Sunat Tuhan Kita Yesus Kristus Menurut Daging",
		julianMonth: 1,
		julianDay: 1,
		type: "major",
	},
	{
		name: "St. Basil the Great",
		nameEl: "Άγιος Βασίλειος ο Μέγας",
		nameId: "Js. Basilius Agung",
		julianMonth: 1,
		julianDay: 1,
		type: "major",
	},
	{
		name: "St. John Chrysostom",
		nameEl: "Άγιος Ιωάννης ο Χρυσόστομος",
		nameId: "Js. Yohanes Krisostomus",
		julianMonth: 11,
		julianDay: 13,
		type: "major",
	},
	{
		name: "St. Nicholas the Wonderworker",
		nameEl: "Άγιος Νικόλαος",
		nameId: "Js. Nikolaus Sang Pekerja Mukjizat",
		julianMonth: 12,
		julianDay: 6,
		type: "major",
	},
	{
		name: "Ss. Peter and Paul",
		nameEl: "Άγιοι Πέτρος και Παύλος",
		nameId: "Js. Petrus dan Paulus",
		julianMonth: 6,
		julianDay: 29,
		type: "major",
	},
	{
		name: "Synaxis of the Three Holy Hierarchs",
		nameEl: "Σύναξις τῶν Τριῶν Ἱεραρχῶν",
		nameId: "Sinaxi Tiga Hierarki Suci",
		julianMonth: 1,
		julianDay: 30,
		type: "major",
	},
	{
		name: "St. George the Great Martyr",
		nameEl: "Ἅγιος Γεώργιος ὁ Μεγαλομάρτυς",
		nameId: "Js. Georgius Martir Agung",
		julianMonth: 4,
		julianDay: 23,
		type: "major",
	},
	{
		name: "Nativity of St. John the Baptist",
		nameEl: "Τὸ Γενέσιον τοῦ Τιμίου Προδρόμου",
		nameId: "Kelahiran Js. Yohanes Pembaptis",
		julianMonth: 6,
		julianDay: 24,
		type: "major",
	},
	{
		name: "Beheading of St. John the Baptist",
		nameEl: "Ἡ Ἀποτομὴ τῆς Κεφαλῆς τοῦ Τιμίου Προδρόμου",
		nameId: "Pemenggalan Kepala Js. Yohanes Pembaptis",
		julianMonth: 8,
		julianDay: 29,
		type: "major",
	},
	{
		name: "Protection of the Theotokos",
		nameEl: "Ἡ Ἁγία Σκέπη τῆς Ὑπεραγίας Θεοτόκου",
		nameId: "Perlindungan Bunda Allah yang Mahasuci",
		julianMonth: 10,
		julianDay: 1,
		type: "major",
	},
	{
		name: "St. Andrew the First-Called",
		nameEl: "Ἅγιος Ἀνδρέας ὁ Πρωτόκλητος",
		nameId: "Js. Andreas yang Pertama Dipanggil",
		julianMonth: 11,
		julianDay: 30,
		type: "major",
	},
	// Fasting Periods Start
	{
		name: "Nativity Fast Begins",
		nameEl: "Αρχή Σαρανταημέρου",
		nameId: "Awal Puasa Natal",
		julianMonth: 11,
		julianDay: 15,
		type: "fast",
		fasting: true,
	},
	{
		name: "Dormition Fast Begins",
		nameEl: "Αρχή Νηστείας Δεκαπενταύγουστου",
		nameId: "Awal Puasa Peristirahatan",
		julianMonth: 8,
		julianDay: 1,
		type: "fast",
		fasting: true,
	},
]

// ──────────────────────────────────────
// Moveable Feasts (relative to Pascha)
// ──────────────────────────────────────
export interface MoveableFeast {
	name: string
	nameEl: string
	nameId: string
	daysFromPascha: number
	type: "great" | "major" | "minor" | "fast"
}

export const MOVEABLE_FEASTS: MoveableFeast[] = [
	{
		name: "Great Lent Begins (Clean Monday)",
		nameEl: "Καθαρά Δευτέρα",
		nameId: "Senin Bersih (Awal Prapaskah Agung)",
		daysFromPascha: -48,
		type: "fast",
	},
	{
		name: "Palm Sunday",
		nameEl: "Κυριακή των Βαΐων",
		nameId: "Minggu Palma",
		daysFromPascha: -7,
		type: "great",
	},
	{
		name: "Great and Holy Friday",
		nameEl: "Μεγάλη Παρασκευή",
		nameId: "Jumat Agung",
		daysFromPascha: -2,
		type: "great",
	},
	{
		name: "Great and Holy Saturday",
		nameEl: "Μέγα Σάββατο",
		nameId: "Sabtu Suci",
		daysFromPascha: -1,
		type: "great",
	},
	{
		name: "Pascha (Easter)",
		nameEl: "Πάσχα",
		nameId: "Paskah",
		daysFromPascha: 0,
		type: "great",
	},
	{
		name: "Bright Monday",
		nameEl: "Δευτέρα της Διακαινησίμου",
		nameId: "Senin Terang",
		daysFromPascha: 1,
		type: "major",
	},
	{
		name: "Mid-Pentecost",
		nameEl: "Μεσοπεντηκοστή",
		nameId: "Pertengahan Pentakosta",
		daysFromPascha: 25,
		type: "minor",
	},
	{
		name: "Ascension",
		nameEl: "Ανάληψις",
		nameId: "Kenaikan Tuhan",
		daysFromPascha: 39,
		type: "great",
	},
	{
		name: "Pentecost (Trinity Sunday)",
		nameEl: "Πεντηκοστή",
		nameId: "Pentakosta (Hari Tritunggal)",
		daysFromPascha: 49,
		type: "great",
	},
	{
		name: "All Saints Sunday",
		nameEl: "Κυριακή Αγίων Πάντων",
		nameId: "Minggu Semua Orang Kudus",
		daysFromPascha: 56,
		type: "major",
	},
	{
		name: "Apostles' Fast Begins",
		nameEl: "Αρχή Νηστείας Αποστόλων",
		nameId: "Awal Puasa Para Rasul",
		daysFromPascha: 57,
		type: "fast",
	},

	// Add to MOVEABLE_FEASTS:
	{
		name: "Sunday of the Publican & Pharisee",
		nameEl: "Κυριακή Τελώνου και Φαρισαίου",
		nameId: "Minggu Orang Farisi dan Pemungut Cukai",
		daysFromPascha: -70,
		type: "minor"
	},
	{
		name: "Sunday of the Prodigal Son",
		nameEl: "Κυριακή του Ασώτου",
		nameId: "Minggu Anak Hilang yang Bertobat",
		daysFromPascha: -63,
		type: "minor"
	},
	{
		name: "Saturday of the Souls (1st)",
		nameEl: "Ψυχοσάββατο Α'",
		nameId: "Sabtu Para Jiwa (ke-1)",
		daysFromPascha: -57,
		type: "minor"
	},
	{
		name: "Meatfare Sunday (Last Judgment)",
		nameEl: "Κυριακή Απόκρεω",
		nameId: "Minggu Penghakiman Akhir",
		daysFromPascha: -56,
		type: "minor"
	},
	{
		name: "Forgiveness Sunday (Cheesefare)",
		nameEl: "Κυριακή τής Τυροφάγου",
		nameId: "Minggu Pengampunan Dosa",
		daysFromPascha: -49,
		type: "minor"
	},
	{
		name: "Sunday of Orthodoxy",
		nameEl: "Κυριακή τής Ορθοδοξίας",
		nameId: "Minggu Kemenangan Orthodoxia",
		daysFromPascha: -42,
		type: "major"
	},
	{
		name: "Saturday of the Souls (2nd)",
		nameEl: "Ψυχοσάββατο Β'",
		nameId: "Sabtu Para Jiwa (ke-2)",
		daysFromPascha: -36,
		type: "minor"
	},
	{
		name: "Sunday of Gregory Palamas",
		nameEl: "Κυριακή Γρηγορίου Παλαμά",
		nameId: "Minggu Gregorius Palamas",
		daysFromPascha: -35,
		type: "major"
	},
	{
		name: "Saturday of the Souls (3rd)",
		nameEl: "Ψυχοσάββατο Γ'",
		nameId: "Sabtu Para Jiwa (ke-3)",
		daysFromPascha: -29,
		type: "minor"
	},
	{
		name: "Sunday of the Holy Cross",
		nameEl: "Κυριακή τής Σταυροπροσκυνήσεως",
		nameId: "Minggu Pemuliaan Salib Kudus",
		daysFromPascha: -28,
		type: "major"
	},
	{
		name: "Saturday of the Souls (4th)",
		nameEl: "Ψυχοσάββατο Δ'",
		nameId: "Sabtu Para Jiwa (ke-4)",
		daysFromPascha: -22,
		type: "minor"
	},
	{
		name: "Sunday of John Climacus",
		nameEl: "Κυριακή Ιωάννου τής Κλίμακος",
		nameId: "Minggu Yohanes Klimakus",
		daysFromPascha: -21,
		type: "major"
	},
	{
		name: "Sunday of Mary of Egypt",
		nameEl: "Κυριακή Μαρίας τής Αιγυπτίας",
		nameId: "Minggu Maria dari Mesir",
		daysFromPascha: -14,
		type: "major"
	},
	{
		name: "Lazarus Saturday",
		nameEl: "Σάββατο τού Λαζάρου",
		nameId: "Sabtu Lazarus",
		daysFromPascha: -8,
		type: "major"
	},
	{
		name: "Holy Monday",
		nameEl: "Μεγάλη Δευτέρα",
		nameId: "Senin Kudus",
		daysFromPascha: -6,
		type: "major"
	},
	{
		name: "Holy Tuesday",
		nameEl: "Μεγάλη Τρίτη",
		nameId: "Selasa Kudus",
		daysFromPascha: -5,
		type: "major"
	},
	{
		name: "Holy Wednesday (Anointing)",
		nameEl: "Μεγάλη Τετάρτη",
		nameId: "Rabu Kudus (Pengurapan Minyak Kudus)",
		daysFromPascha: -4,
		type: "major"
	},
	{
		name: "Holy Thursday",
		nameEl: "Μεγάλη Πέμπτη",
		nameId: "Kamis Kudus (Pembasuhan kaki ke-12 Murid)",
		daysFromPascha: -3,
		type: "great"
	},
	{
		name: "Thomas Sunday",
		nameEl: "Κυριακή τού Θωμά",
		nameId: "Minggu Thomas",
		daysFromPascha: 7,
		type: "major"
	},
	{
		name: "Monday of the Holy Spirit",
		nameEl: "Δευτέρα τοῦ Ἁγίου Πνεύματος",
		nameId: "Senin Roh Kudus",
		daysFromPascha: 50,
		type: "major",
	},
	{
		name: "Saturday of the Souls (Pentecost)",
		nameEl: "Ψυχοσάββατο πρὸ τῆς Πεντηκοστῆς",
		nameId: "Sabtu Para Jiwa (sebelum Pentakosta)",
		daysFromPascha: 48,
		type: "minor",
	},
	{
		name: "Sunday of All Saints of Russia/Local Saints",
		nameEl: "Κυριακή Πάντων τῶν ἐν τῇ Ρωσσίᾳ Ἁγίων",
		nameId: "Minggu Semua Orang Kudus Lokal",
		daysFromPascha: 63,
		type: "minor",
	},
	{
		name: "Bright Tuesday",
		nameEl: "Τρίτη τῆς Διακαινησίμου",
		nameId: "Selasa Terang",
		daysFromPascha: 2,
		type: "minor",
	},
	{
		name: "Bright Wednesday",
		nameEl: "Τετάρτη τῆς Διακαινησίμου",
		nameId: "Rabu Terang",
		daysFromPascha: 3,
		type: "minor",
	},
	{
		name: "Bright Thursday",
		nameEl: "Πέμπτη τῆς Διακαινησίμου",
		nameId: "Kamis Terang",
		daysFromPascha: 4,
		type: "minor",
	},
	{
		name: "Bright Friday — Theotokos of the Life-Giving Spring",
		nameEl: "Παρασκευή τῆς Διακαινησίμου — Ζωοδόχος Πηγή",
		nameId: "Jumat Terang — Bunda Allah Sumber Kehidupan",
		daysFromPascha: 5,
		type: "major",
	},
	{
		name: "Bright Saturday",
		nameEl: "Σάββατον τῆς Διακαινησίμου",
		nameId: "Sabtu Terang",
		daysFromPascha: 6,
		type: "minor",
	},
	{
		name: "Sunday of the Myrrh-Bearing Women",
		nameEl: "Κυριακή τῶν Μυροφόρων",
		nameId: "Minggu Para Perempuan Pembawa Mur",
		daysFromPascha: 14,
		type: "major",
	},
	{
		name: "Sunday of the Paralytic",
		nameEl: "Κυριακή τοῦ Παραλύτου",
		nameId: "Minggu Orang Lumpuh",
		daysFromPascha: 21,
		type: "major",
	},
	{
		name: "Wednesday of Mid-Pentecost",
		nameEl: "Τετάρτη τῆς Μεσοπεντηκοστῆς",
		nameId: "Rabu Pertengahan Pentakosta",
		daysFromPascha: 25,
		type: "minor",
	},
	{
		name: "Sunday of the Samaritan Woman",
		nameEl: "Κυριακή τῆς Σαμαρείτιδος",
		nameId: "Minggu Perempuan Samaria",
		daysFromPascha: 28,
		type: "major",
	},
	{
		name: "Sunday of the Blind Man",
		nameEl: "Κυριακή τοῦ Τυφλοῦ",
		nameId: "Minggu Orang Buta",
		daysFromPascha: 35,
		type: "major",
	},
	{
		name: "Leave-taking of Pascha",
		nameEl: "Ἀπόδοσις τοῦ Πάσχα",
		nameId: "Penutupan Paskah",
		daysFromPascha: 38,
		type: "minor",
	},
	{
		name: "Saturday of the Souls (before Pentecost)",
		nameEl: "Ψυχοσάββατο πρὸ τῆς Πεντηκοστῆς",
		nameId: "Sabtu Para Jiwa (sebelum Pentakosta)",
		daysFromPascha: 48,
		type: "minor",
	},
	{
		name: "Sunday of the Holy Fathers of the First Ecumenical Council",
		nameEl: "Κυριακή τῶν Ἁγίων Πατέρων τῆς Α' Οἰκουμ. Συνόδου",
		nameId: "Minggu Para Bapa Suci Konsili Ekumenis Pertama",
		daysFromPascha: 42,
		type: "major",
	},
]

interface PaschalWeek {
	name: string
	nameEl: string
	nameId: string
	desc: string
}

export const PASCHAL_WEEKS: PaschalWeek[] = [
	{
		name: "2nd Week of Pascha (Thomas Sunday)",
		nameEl: "Β' Εβδομάδα Πάσχα (Κυριακή του Θωμά)",
		nameId: "Minggu ke-2 Paskah (Minggu Thomas)",
		desc: "Commemoration of the Apostle Thomas touching Christ's wounds.",
	},
	{
		name: "3rd Week of Pascha (Myrrhbearers)",
		nameEl: "Γ' Εβδομάδα Πάσχα (Μυροφόρων)",
		nameId: "Minggu ke-3 Paskah (Pembawa Mur)",
		desc: "Honour of the women who brought myrrh to Christ's tomb.",
	},
	{
		name: "4th Week of Pascha (Paralytic)",
		nameEl: "Δ' Εβδομάδα Πάσχα (Παραλύτου)",
		nameId: "Minggu ke-4 Paskah (Orang Lumpuh)",
		desc: "Healing of the Paralytic at the Pool of Bethesda.",
	},
	{
		name: "5th Week of Pascha (Samaritan Woman)",
		nameEl: "Ε' Εβδομάδα Πάσχα (Σαμαρείτιδος)",
		nameId: "Minggu ke-5 Paskah (Perempuan Samaria)",
		desc: "Christ's encounter with the Samaritan Woman at the well.",
	},
	{
		name: "6th Week of Pascha (Blind Man)",
		nameEl: "ΣΤ' Εβδομάδα Πάσχα (Τυφλού)",
		nameId: "Minggu ke-6 Paskah (Orang Buta)",
		desc: "Healing of the man born blind.",
	},
	{
		name: "7th Week of Pascha (Ascension)",
		nameEl: "Ζ' Εβδομάδα Πάσχα (Αναλήψεως)",
		nameId: "Minggu ke-7 Paskah (Kenaikan)",
		desc: "The Ascension of our Lord into Heaven.",
	},
]

interface LentWeek {
	name: string
	nameEl: string
	nameId: string
	desc: string
}

export const LENT_WEEKS: LentWeek[] = [
	{
		name: "Holy Week",
		nameEl: "Μεγάλη Εβδομάδα",
		nameId: "Pekan Kudus",
		desc: "The week of Christ's Passion, Crucifixion, and Burial.",
	},
	{
		name: "6th Week of Great Lent (Palm Week)",
		nameEl: "ΣΤ' Εβδομάδα Νηστειών",
		nameId: "Minggu ke-6 Prapaskah (Minggu Palma)",
		desc: "Preparation for the Entry into Jerusalem.",
	},
	{
		name: "5th Week of Great Lent",
		nameEl: "Ε' Εβδομάδα Νηστειών",
		nameId: "Minggu ke-5 Prapaskah",
		desc: "Commemoration of St. Mary of Egypt.",
	},
	// Also fix in LENT_WEEKS — update the 4th week:
	// name: "4th Week of Great Lent" → desc should be "St. John Climacus. The Ladder of Divine Ascent."
	{
		name: "4th Week of Great Lent",
		nameEl: "Δ' Εβδομάδα Νηστειών",
		nameId: "Minggu ke-4 Prapaskah",
		desc: "Veneration of the Holy Cross.",
	},
	{
		name: "3rd Week of Great Lent",
		nameEl: "Γ' Εβδομάδα Νηστειών",
		nameId: "Minggu ke-3 Prapaskah",
		desc: "Week of the Cross.",
	},
	{
		name: "2nd Week of Great Lent",
		nameEl: "Β' Εβδομάδα Νηστειών",
		nameId: "Minggu ke-2 Prapaskah",
		desc: "Commemoration of St. Gregory Palamas.",
	},
]