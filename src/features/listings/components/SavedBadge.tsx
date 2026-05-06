
function SavedBadge({count}:{count:number}) {
  return (
     <div>{count}{count===1?'saved':'saved'}</div>
  )
}

export default SavedBadge