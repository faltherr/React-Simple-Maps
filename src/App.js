import React, { useState } from 'react';
import SimpleMap from './SimpleMap';
import { dataStructure1 } from './mockAPIData.js'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
const censusRegions = "US_CensusRegions.json"
const earth = "githubEarth.json"

const pathogenColors = { 'adenovirus': '#FF2724', 'pertussis': '#E07B00' }
const mapOptions = {
  'United States of America': {
    projection: 'geoAlbersUsa',
    topoJson: censusRegions
  },
  'World': {
    projection: 'geoEqualEarth',
    topoJson: earth
  }
}

function App () {
  const dateSlices = Object.keys(dataStructure1)
  const availablePathogens = ['adenovirus', 'pertussis']
  const availableBaseRegions = ['United States of America', 'World']
  const [visibleDate, setVisibleDate] = useState(dateSlices[0])
  const [visiblePathogens, setVisiblePathogens] = useState(availablePathogens)
  const [geoView, setGeoView] = useState(availableBaseRegions[0])

  const addOrRemovePathogen = ptgn => {
    const exists = visiblePathogens.some(p => p === ptgn)
    if (exists) {
      const filteredArr = visiblePathogens.filter(p => p !== ptgn)
      setVisiblePathogens(filteredArr)
      return
    } else {
      const newArr = [...visiblePathogens, ptgn]
      return setVisiblePathogens(newArr)
    }
  }

  const displayedDataSelector = (date, target, data) => {
    return data[date][target]
  }

  return (
    <div>
      <div>
        <h4>Date Selector</h4>
        <ButtonGroup>
          {dateSlices.map(d => (
            <Button onClick={() => setVisibleDate(d)}>{d}</Button>
          ))}
        </ButtonGroup>
      </div>

      <div>
        <h4>Pathogen Filter</h4>
        <ButtonGroup>
          {availablePathogens.map(p => {
            return (
              <Button onClick={() => addOrRemovePathogen(p)}>{p}</Button>
            )
          })}
        </ButtonGroup>
      </div>

      <div>
        <h4>Base Map</h4>
        <ButtonGroup>
          {availableBaseRegions.map(r => {
            return (
              <Button onClick={() => setGeoView(r)}>{r}</Button>
            )
          })}
        </ButtonGroup>
      </div>

      <hr />
      <h3>Maps for {visibleDate}</h3>
      {visiblePathogens.map(p => (
        <div>
          <h4>{p}</h4>
          <SimpleMap
            projection={mapOptions[geoView].projection}
            topoJson={mapOptions[geoView].topoJson}
            data={displayedDataSelector(visibleDate, p, dataStructure1)}
            targetColor={pathogenColors[p]}  
          />
        </div>
      ))}
    </div>
  );
}

export default App;
