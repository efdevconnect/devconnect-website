import React from 'react'
import ShareIcon from 'assets/icons/share.svg'
import Tooltip from '../tooltip'

type ShareProps = {
  url: string
  onShare?: () => any
}

export const CopyToClipboard = ({ url, onShare }: ShareProps) => {
  const [clicked, setClicked] = React.useState(false)

  return (
    <Tooltip arrow={false} open={clicked} title="Copied to Clipboard">
      <div style={{ display: 'inline-block', cursor: 'pointer' }}>
        <ShareIcon
          onClick={() => {
            if (onShare) {
              onShare()
              return
            }

            if (window?.navigator?.clipboard) {
              navigator.clipboard.writeText(url)

              setClicked(true)

              setTimeout(() => {
                setClicked(false)
              }, 800)
            }
          }}
        />
      </div>
    </Tooltip>
  )
}
