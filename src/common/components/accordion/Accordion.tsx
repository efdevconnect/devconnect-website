import React from 'react'
import css from './accordion.module.scss'
import ChevronDown from 'assets/icons/chevron-down.svg'
import ChevronUp from 'assets/icons/chevron-up.svg'

export const AccordionItem = React.forwardRef((props: any, ref: any) => {
  const [open, setOpen] = React.useState(false)

  React.useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
    }
  })

  return (
    <div className={css['accordion']}>
      <div id={props.id} className={`bold big-text ${css['toggle']}`} onClick={() => setOpen(!open)}>
        <p>{props.title}</p>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>
      {open && <div className={css['content']}>{props.children}</div>}
    </div>
  )
})

AccordionItem.displayName = 'AccordionItem'

const Accordion = (props: any) => {
  return <div className={css['accordions']}>{props.children}</div>
}

export default Accordion
