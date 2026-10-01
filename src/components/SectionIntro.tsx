type SectionIntroProps = {
  eyebrow: string
  title: string
  description?: string
  titleId?: string
}

export function SectionIntro({ eyebrow, title, description, titleId }: SectionIntroProps) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  )
}
