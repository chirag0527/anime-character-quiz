export default function Card(props){
    return(
        <div className="card">
            <div className="image-container">
                <img src={props.img}
                className="card-image"></img>
                <h3>{props.name}</h3>
            </div>
        </div>
    )
}