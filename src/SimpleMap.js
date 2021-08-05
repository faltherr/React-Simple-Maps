import React from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from 'd3-scale'

export default function SimpleMap (props) {
  //THis will take in the array of detection rates and create the max color from that
  // ratesArray, targetColor
  const colorScale = scaleLinear()
    // .domain([0, Math.max(0.3, ...Object.values(props.data))])
    .domain([0, 0.03])
    .range(["#ffffff", props.targetColor]);

  return (
    <>
      <ComposableMap
        projection={props.projection}
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: props.projection === 'geoAlbersUsa' ? 1000 : 147
        }}
      >
        {props.data && (
          <>
            <Geographies geography={props.topoJson}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const regionDetectionRate = props.data[geo.properties.NAME]
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={regionDetectionRate ? colorScale(regionDetectionRate) : "#DDDDDD"}
                    />
                  );
                })
              }
            </Geographies>
          </>
        )}
      </ComposableMap>
    </>
  )
}
