export default function Card(props){
    return(
        <div className={props.className} onClick={props.onclick}>
            <div className="image-container">
                <img src={props.img}
                className="card-image"></img>
                <h3>{props.name}</h3>
            </div>
        </div>
    )
}