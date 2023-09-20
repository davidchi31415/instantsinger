import "./styles.css";

export const RecordPlayerComponent = ({ playing }) => {
    return (
        <div id="turntable">
            <div id="table-shadow"></div>
            <div id="table-feet"></div>
            <div id="wood"></div>
            <div id="wood2"></div>
            <div id="table"></div>
            <div id="button"></div>
            <div id="disk">
                <div id="label" className={playing ? "spinning" : ""}></div>
            </div>
            <div id="axis-shadow"></div>
            <div id="axis"></div>
            <div id="arm-shadow"></div>
            <div id="weight-shadow"></div>
            <div id="base">
                <div id="axle-shadow"></div>
            </div>
            <div id="lever"></div>
            <div id="weight"></div>
            <div id="axle"></div>
            <div id="arm"></div>
            <div id="head"></div>
        </div>
    );
}