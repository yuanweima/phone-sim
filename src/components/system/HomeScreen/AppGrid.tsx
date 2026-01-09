import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { AppIcon } from './AppIcon'

interface AppGridProps {
  pageIndex: number
  onLongPress: () => void
}

export function AppGrid({ pageIndex, onLongPress }: AppGridProps) {
  const homePages = usePhoneStore((state) => state.homePages)
  const page = homePages[pageIndex]

  if (!page) return null

  const { columns, rows, iconSize, topPadding, sidePadding } = DEVICE.grid

  // Calculate icon spacing based on available space
  const availableWidth = DEVICE.width - sidePadding * 2
  const availableHeight = DEVICE.height - topPadding - DEVICE.dock.height - DEVICE.dock.bottomOffset - 60
  const horizontalSpacing = (availableWidth - iconSize * columns) / (columns - 1)
  const verticalSpacing = (availableHeight - (iconSize + 20) * rows) / (rows - 1)

  return (
    <div
      className="grid gap-y-4"
      style={{
        paddingTop: topPadding,
        paddingLeft: sidePadding,
        paddingRight: sidePadding,
        gridTemplateColumns: `repeat(${columns}, ${iconSize}px)`,
        columnGap: horizontalSpacing,
        rowGap: Math.max(20, verticalSpacing),
      }}
    >
      {page.apps.slice(0, columns * rows).map((appIdOrFolder, index) => {
        if (typeof appIdOrFolder === 'string') {
          return (
            <AppIcon
              key={`${pageIndex}-${index}-${appIdOrFolder}`}
              appId={appIdOrFolder}
              onLongPress={onLongPress}
            />
          )
        }
        // Folder rendering would go here
        return null
      })}
    </div>
  )
}
