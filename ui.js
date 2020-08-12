var notWideNoteInput = document.getElementById('noteInput')
var notWideNoteForm = document.getElementsByClassName('noteForm')[0]
var wideNoteForm = document.getElementsByClassName('noteForm')[1]
var noteBodyInput = document.getElementById('noteBodyInput')
notWideNoteInput.addEventListener('focus', () => {
    notWideNoteForm.style.display = 'none'
    wideNoteForm.style.display = 'block'
    noteBodyInput.focus()
})
