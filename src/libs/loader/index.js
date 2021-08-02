import { Fragment } from 'react'

import Loading from '@/src/components/libs/loading'
import Empty from '@/src/components/helpers/empty'

const Loader = ({ source, loading, component, blank, template, map = true, spinner = true }) => {

  const empty = typeof blank === 'boolean' ? blank : true

  if (loading) {
    if (spinner)
      return <Loading />
  }

  if (source === undefined)
    return null

  if (Array.isArray(source)) {

    if (source.length) {

      if (!map) {
        return component(source)
      }

      return (
        <Fragment>
          {source.map((item, index) => (
            component(item, index)
          ))}
        </Fragment>
      )
    }

  } else if (source instanceof Object) {

    if (Object.values(source).indexOf(null))
      return component(source)
  }

  if (empty)
    return <Empty />

  else {

    if (template) {

      return template()
    }

    return null
  }

}

export default Loader
