import "./Aegung_SpecialStore_Connector.scss";

/**
 * 커넥터 컴포넌트: dot(●) + line(─)
 *
 * props:
 *  length   {string}  커넥터 전체 너비 (기본 "120px", "100%" 등)
 *  rotate   {number}  회전 각도 deg (기본 0)
 *  dotSize  {string}  dot 지름 (기본 "12px")
 */
const Aegung_SpecialStore_Connector = ({
  length = "120px",
  rotate = 0,
  dotSize = "12px",
}) => {
  return (
    <div
      className="SpecialStore_connector"
      style={{
        width: length,
        transform: rotate !== 0 ? `rotate(${rotate}deg)` : undefined,
        transformOrigin: "center center",
      }}
    >
      <span
        className="SpecialStore_connector__dot"
        style={{ width: dotSize, height: dotSize }}
      />
      <span className="SpecialStore_connector__line" />
    </div>
  );
};

export default Aegung_SpecialStore_Connector;
