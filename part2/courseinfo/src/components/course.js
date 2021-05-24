import Header from './header'
import Content from './content'
import Total from './total'


const Course = ({ name, parts }) => (
    <>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
    </>
)

export default Course