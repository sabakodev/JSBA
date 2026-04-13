import { CACHE_IMMUTABLE } from '@/lib/utils'
import { NextResponse } from 'next/server'

export function GET() {
	return NextResponse.json({
		endpoints: {
			legend: {
				path: '/api/calendar/legend',
				method: 'GET',
				description: 'Feast and fasting type labels (static)',
				params: null,
			},
			week: {
				path: '/api/calendar/week',
				method: 'GET',
				description: 'Liturgical week info for a given date',
				params: {
					date: {
						type: 'string',
						format: 'YYYY-MM-DD',
						required: false,
						default: 'today',
					},
				},
			},
			days: {
				path: '/api/calendar/days',
				method: 'GET',
				description: 'Daily feast, fasting, and commemoration data for selected month',
				params: {
					month: {
						type: 'string',
						format: 'YYYY-MM',
						required: false,
						default: 'this month',
					},
				},
			},
		},
	}, {
		headers: CACHE_IMMUTABLE,
	})
}