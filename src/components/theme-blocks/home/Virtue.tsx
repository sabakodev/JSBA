import { useTranslations } from "next-intl"
import ChurchOutlinedIcon from '@mui/icons-material/ChurchOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'

export default function Component() {
	const t = useTranslations('HomePage.virtues')

	const virtues = [
		{
			icon: <ChurchOutlinedIcon style={{ fontSize: 24 }} />,
			label: t('sacramento.title'),
			description: t('sacramento.description')
		},
		{
			icon: <GroupsOutlinedIcon style={{ fontSize: 24 }} />,
			label: t('community.title'),
			description: t('community.description')
		},
		{
			icon: <MenuBookOutlinedIcon style={{ fontSize: 24 }} />,
			label: t('struggle.title'),
			description: t('struggle.description')
		},
	]

	return (
		<div className="bg-accent py-32 min-w-screen">
			<div className="px-4 text-center max-w-2xl mb-20 mx-auto">
				<h1 className="text-5xl mb-6">{t('title')}</h1>
				<p className="text-primary-200">{t('description')}</p>
			</div>
			<div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 px-4 gap-y-4 lg:gap-y-0 sm:gap-x-4">
				{virtues.map((value, index) => (
					<div key={index} className="rounded-sm bg-white p-10">
						<div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary-900 text-primary-400">
							{value.icon}
						</div>
						<h2 className="text-2xl my-6">{value.label}</h2>
						<p className="font-extralight text-lg">{value.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}