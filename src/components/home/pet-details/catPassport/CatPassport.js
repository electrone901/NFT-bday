import React, { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer'
import './App.css'

const App = () => {
  const viewer = useRef(null)

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/p.pdf',
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core

      const { WidgetFlags } = Annotations

      documentViewer.addEventListener('documentLoaded', () => {
        // new
        // set flags for multiline and required
        const flags = new WidgetFlags()
        flags.set('Multiline', false)
        flags.set('Required', false)

        // create a form field
        const field = new Annotations.Forms.Field('some text field name', {
          type: 'Tx',
          value: 'NX0019390-4567',
          flags,
        })

        // create a widget annotation
        const widgetAnnot = new Annotations.TextWidgetAnnotation(field)

        // set position and size
        widgetAnnot.PageNumber = 1
        widgetAnnot.X = 450
        widgetAnnot.Y = 80
        widgetAnnot.Width = 150
        widgetAnnot.Height = 20

        //add the form field and widget annotation
        annotationManager.addAnnotation(widgetAnnot)
        annotationManager.drawAnnotationsFromList([widgetAnnot])
        annotationManager.getFieldManager().addField(field)

        // const rectangleAnnot = new Annotations.RectangleAnnotation({
        //   PageNumber: 1,
        //   // values are in page coordinates with (0, 0) in the top left
        //   X: 450,
        //   Y: 80,
        //   Width: 150,
        //   Height: 30,
        //   Author: annotationManager.getCurrentUser(),
        //   text: 'some placeholder default text value',
        // })

        // annotationManager.addAnnotation(rectangleAnnot)
        // // need to draw the annotation otherwise it won't show up until the page is refreshed
        // annotationManager.redrawAnnotation(rectangleAnnot)
      })
    })
  }, [])

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  )
}

export default App
