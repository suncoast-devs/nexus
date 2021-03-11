import cx from 'classnames'

export function panelClass(selected) {
  return cx('panel-block', 'has-cursor-pointer', 'is-block', {
    'has-background-success': selected,
    'has-text-white': selected,
  })
}
