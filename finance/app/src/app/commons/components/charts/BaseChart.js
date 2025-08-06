import React, { useRef, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import { FaExpand, FaCompress } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { MdGridOff } from "react-icons/md";
import { CgClose } from "react-icons/cg";

import { ChartType } from "../../../enums/chart-type.enum";
import ButtonIcon from "../buttons/button-icon/ButtonIcon";
import ErrorBoundary from "../error-boundary/ErrorBoundary";
import CandleVolumeChart from "./CandleVolumeChart";

import "./BaseChart.css";

const Render = ({ chart, height }) => {
  const { type, items } = chart;

  if (!items || items.length === 0) return <div>No data</div>;

  switch (type) {
    case ChartType.CandleStick:
      const ohlc = items.map(item => [item.time, item.open, item.high, item.low, item.close]);
      const volume = items.map(item => [item.time, item.volume || 0]);
      return (
        <CandleVolumeChart
          ohlcData={ohlc}
          volumeData={volume}
          height={height}
        />
      );
    default:
      return <div>Tipo di grafico non supportato</div>;
  }
};

function BaseChart({ chart, onClose, onSelect, height = 300 }) {
  const [expand, setExpand] = useState(false);
  const chartRef = useRef();

  return (
    <LoadingOverlay
      active={chart.loading}
      spinner={
        <Loader
          className="app-accordion--loader"
          type="ThreeDots"
          color="#bbbbbb"
          height={50}
          width={100}
        />
      }
      fadeSpeed={0}
    >
      <div className="app-chart-header">
        <div className="app-chart-header--title" onClick={onSelect}>
          {chart.label}
        </div>
        <div className="app-chart-header--control">
          {/* Pulsante download disattivato finché non integriamo salvataggio immagini con highcharts */}
          <ButtonIcon theme="dark" fontSize={20} onClick={() => {}}>
            <FiDownload />
          </ButtonIcon>

          <ButtonIcon theme="dark" fontSize={20} onClick={() => setExpand(!expand)} check={true}>
            {expand ? <FaCompress /> : <FaExpand />}
          </ButtonIcon>

          {onClose && (
            <ButtonIcon theme="dark" fontSize={20} onClick={onClose}>
              <CgClose />
            </ButtonIcon>
          )}
        </div>
      </div>

      {chart.items && chart.items.length > 0 ? (
        <ErrorBoundary key={chart.id} failed={!chart.loading && chart.failed}>
          <Render chart={chart} height={expand ? height + 200 : height} />
        </ErrorBoundary>
      ) : (
        <div className="app-charts--empty">There are no data to display</div>
      )}
    </LoadingOverlay>
  );
}

export default BaseChart;
