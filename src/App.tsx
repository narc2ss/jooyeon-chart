import { Line, LinePath } from "@visx/shape";
import { extent } from "@visx/vendor/d3-array";
import data from "./data";
import { TimeDomain, scaleLinear, scaleTime } from "@visx/scale";
import { Axis } from "@visx/axis";
import { Group } from "@visx/group";
import { GlyphCircle } from "@visx/glyph";
import { Text } from "@visx/text";

const getPaddingWithDomain = (domain: TimeDomain) => {
  const [min, max] = domain;
  const diff = new Date(max).getTime() - new Date(min).getTime();
  const newMin = new Date(new Date(min).getTime() - diff * 0.06);
  const newMax = new Date(new Date(max).getTime() + diff * 0.06);
  return [newMin, newMax];
};

function App() {
  const width = 400;
  const height = 180;
  const margin = { top: 10, left: 20, bottom: 30, right: 10 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  console.log(extent([41, 26, 2, 77, 12823]));

  console.log(extent(data.map(({ x }) => new Date(x))));

  const xDomain = getPaddingWithDomain(
    extent(data, (d) => new Date(d.x)) as TimeDomain
  ) as TimeDomain;

  const xScale = scaleTime({
    domain: xDomain,
    range: [0, innerWidth],
  });
  const yScale = scaleLinear({
    domain: [0, 100],
    range: [innerHeight, 0],
  });

  return (
    <div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Group left={margin.left} top={margin.top}>
          <Axis scale={yScale} orientation="left" numTicks={4} />
        </Group>
        <Group left={margin.left} top={margin.top}>
          <Line
            from={{ x: xScale(xDomain[0]), y: yScale(0) }}
            to={{ x: xScale(xDomain[0]) + innerWidth, y: yScale(0) }}
            stroke="#e3e3e3"
          />
        </Group>
        <Group left={margin.left} top={margin.top}>
          <LinePath
            data={data}
            x={(d) => xScale(new Date(d.x))}
            y={(d) => yScale(d.y)}
            stroke="#F00"
          />
          {data.map(({ x, y }) => (
            <Line
              key={x}
              from={{ x: xScale(new Date(x)), y: yScale(y) }}
              to={{ x: xScale(new Date(x)), y: yScale(0) }}
              stroke="#00F"
            />
          ))}
          {data.map(({ x, y }) => (
            <GlyphCircle
              key={x}
              left={xScale(new Date(x))}
              top={yScale(y)}
              size={8}
            />
          ))}
          {data.map(({ x, y }) => (
            <>
              <rect
                x={xScale(new Date(x)) - 14}
                y={yScale(y + 14)}
                width={25}
                height={12}
                rx={3}
                fill="blue"
                rotate={45}
              ></rect>
              <rect
                x={xScale(new Date(x)) - 2}
                y={yScale(y) - 10}
                width={4}
                height={4}
                fill="blue"
                style={{
                  transform: "rotate(45deg)",
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />

              <Text
                key={x}
                width={40}
                x={xScale(new Date(x)) - 7}
                y={yScale(y + 7)}
                fill="#fff"
                fontSize={10}
              >
                {y}
              </Text>
            </>
          ))}
        </Group>
      </svg>
    </div>
  );
}

export default App;
