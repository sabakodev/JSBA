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
	// Great Feasts
	{
		name: "Nativity of Christ (Christmas)",
		nameEl: "Χριστούγεννα",
		nameId: "Kelahiran Kristus (Natal)",
		julianMonth: 12,
		julianDay: 25,
		type: "great",
	},
	{
		name: "Theophany (Epiphany)",
		nameEl: "Θεοφάνεια",
		nameId: "Teofani (Penampakan Tuhan)",
		julianMonth: 1,
		julianDay: 6,
		type: "great",
	},
	{
		name: "Meeting of the Lord (Hypapante)",
		nameEl: "Υπαπαντή του Κυρίου",
		nameId: "Pertemuan Tuhan di Bait Allah (Hypapandi",
		julianMonth: 2,
		julianDay: 2,
		type: "great",
	},
	{
		name: "Annunciation",
		nameEl: "Ευαγγελισμός της Θεοτόκου",
		nameId: "Kabar Sukacita",
		julianMonth: 3,
		julianDay: 25,
		type: "great",
	},
	{
		name: "Transfiguration",
		nameEl: "Μεταμόρφωσις του Σωτήρος",
		nameId: "Transfigurasi Kristus",
		julianMonth: 8,
		julianDay: 6,
		type: "great",
	},
	{
		name: "Dormition of the Theotokos",
		nameEl: "Κοίμησις της Θεοτόκου",
		nameId: "Peristirahatan Bunda Allah",
		julianMonth: 8,
		julianDay: 15,
		type: "great",
	},
	{
		name: "Nativity of the Theotokos",
		nameEl: "Γενέθλιον της Θεοτόκου",
		nameId: "Kelahiran Bunda Allah",
		julianMonth: 9,
		julianDay: 8,
		type: "great",
	},
	{
		name: "Exaltation of the Holy Cross",
		nameEl: "Ύψωσις του Τιμίου Σταυρού",
		nameId: "Pemuliaan Salib Suci",
		julianMonth: 9,
		julianDay: 14,
		type: "great",
	},
	{
		name: "Entry of the Theotokos",
		nameEl: "Εισόδια της Θεοτόκου",
		nameId: "Masuknya Bunda Allah ke Bait Suci",
		julianMonth: 11,
		julianDay: 21,
		type: "great",
	},
	// Major Saints
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
		nameId: "Senin Cerah",
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