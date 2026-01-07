function updatePrintStyle(document: Document, atPage: { size: string; margin: string }) {
  const existingStyle = document.getElementById('dynamicPrintStyle')
  if (existingStyle) existingStyle.remove()

  const style = document.createElement('style')
  style.id = 'dynamicPrintStyle'
  style.textContent = `
        @media print {
          @page {
            size: ${atPage.size};
            margin: ${atPage.margin};
          }
        }
      `

  document.head.appendChild(style)
}

function generatePrintablePages(
  elementToPrint: HTMLElement,
  pageTemplate: HTMLElement,
  rows: number,
  columns: number,
): Node[] {
  const printablePages: Node[] = []

  const elementRect = elementToPrint.getBoundingClientRect()
  const pageRect = pageTemplate.getBoundingClientRect()

  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < columns; ci++) {
      const printablePage = pageTemplate.cloneNode()

      const currentRect = new DOMRect(
        elementRect.x + ci * pageRect.width,
        elementRect.y + ri * pageRect.height,
        pageRect.width,
        pageRect.height,
      )

      cloneIntersectingChildrenIntoTargetElement(elementToPrint, currentRect, printablePage)

      printablePages.push(printablePage)
    }
  }

  return printablePages
}

function cloneIntersectingChildrenIntoTargetElement(
  parentElement: ParentNode,
  rect: DOMRect,
  target: Node,
) {
  const intersectingChildren = getChildrenIntersectingViewport(parentElement, rect)

  for (const child of intersectingChildren) {
    const childRect = child.getBoundingClientRect()

    const clone = child.cloneNode(true) as HTMLElement
    clone.style.position = 'absolute'
    clone.style.left = `${childRect.left - rect.left}px`
    clone.style.top = `${childRect.top - rect.top}px`

    target.appendChild(clone)
  }
}

function getChildrenIntersectingViewport(element: ParentNode, viewport: DOMRect): Element[] {
  const result: Element[] = []
  for (const childElement of element.children) {
    const childRect = childElement.getBoundingClientRect()
    if (intersectRect(viewport, childRect)) {
      result.push(childElement)
    }
  }
  return result
}

function intersectRect(rectA: DOMRect, rectB: DOMRect): boolean {
  return !(
    rectB.left >= rectA.right ||
    rectB.right <= rectA.left ||
    rectB.top >= rectA.bottom ||
    rectB.bottom <= rectA.top
  )
}

export default { updatePrintStyle, generatePrintablePages }
