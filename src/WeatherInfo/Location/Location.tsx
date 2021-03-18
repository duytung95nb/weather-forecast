interface Props {
    city?: string;
}
export default function Location(props: Props) {
    return <div>City: {props.city}</div>;
}
