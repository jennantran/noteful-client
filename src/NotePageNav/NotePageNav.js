import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import HasError from '../HasError'
import './NotePageNav.css'
import PropTypes from 'prop-types'

class NotePageNav extends React.Component {
  //history.goBack() method to go back to the previous entry in the browser's history; as you would when clicking the back button
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render () {
    const { notes, folders } = this.context
    console.log(notes) //retrieves all folders
    console.log(folders) //retrieves all notes
    const { noteId } = this.props.match.params
    console.log(noteId) //undefined
    // If expr1 can be converted to true, returns expr1; else, returns expr2.
    // If a value can be converted to true, the value is so-called truthy
    const note = findNote(notes, noteId) || {}
    console.log(note) // note is empty "{}"
    const folder = findFolder(folders, note.folderid)
    console.log(folder) //displays id, title, but NOT count, and only display folderid 1
    return (
      <div className='NotePageNav'>
        <HasError>
          <CircleButton
            tag='button'
            role='link'
            onClick={() => this.props.history.goBack()}
            className='NotePageNav__back-button'
          >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
            Back
          </CircleButton>
        </HasError>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}
NotePageNav.propTypes = {
  match: PropTypes.object
}
export default NotePageNav;
