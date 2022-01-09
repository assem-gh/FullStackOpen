import Part from './part'

const Content = ({ parts }) => parts.map(part => < Part key={part.id} name={part.name} exercises={part.exercises} />)


export default Content