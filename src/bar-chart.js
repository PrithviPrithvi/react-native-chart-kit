import React from "react";
import { View } from "react-native";
import { Svg, Rect, G, Text } from "react-native-svg";
import AbstractChart from "./abstract-chart";

const barWidth = 32;

class BarChart extends AbstractChart {
  getBarPercentage = () => {
    const { barPercentage = 1 } = this.props.chartConfig;
    return barPercentage;
  };

  renderBars = config => {
    const { data, width, height, paddingTop, paddingRight, datasets } = config;
    const baseHeight = this.calcBaseHeight(data, height);
    var bars = [];
    for(var inc=0; inc<datasets.length; inc++) {
      datasets[inc].data.map((x, i) => {
        const barHeight = this.calcHeight(x, datasets[inc].data, height);
        const barWidth = 32 * this.getBarPercentage();
        bars.push(
          <Rect
            key={Math.random()}
            x={
              paddingRight +
              (i * (width - paddingRight)) / data.length +
              barWidth / 2 + barWidth/datasets.length * inc
            }
            y={
              ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
              paddingTop
            }
            rx={barWidth/datasets.length/2}
            width={barWidth/datasets.length}
            height={(Math.abs(barHeight) / 4) * 3}
            fill={this.props.barColors.length > inc ? this.props.barColors[inc] : this.props.barColors[0]}
          />
        );
      });
    }
    return bars;
  };

  renderBelowBars = config => {
    const { data, width, height, paddingTop, paddingRight, datasets } = config;
    const baseHeight = this.calcBaseHeight(data, height);
    var bars = [];
    for(var inc=0; inc<datasets.length; inc++) {
      datasets[inc].data.map((x, i) => {
        const barHeight = this.calcHeight(x, datasets[inc].data, height);
        const barWidth = 32 * this.getBarPercentage();
        bars.push(
          <Rect
            key={Math.random()}
            x={
              paddingRight +
              (i * (width - paddingRight)) / data.length +
              barWidth / 2 + barWidth/datasets.length * inc
            }
            y={
              ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
              paddingTop + (Math.abs(barHeight) / 4) * 3/2
            }
            width={barWidth/datasets.length}
            height={(Math.abs(barHeight) / 4) * 3/2}
            fill={this.props.barColors.length > inc ? this.props.barColors[inc] : this.props.barColors[0]}
          />
        );
      });
    }
    return bars;
  };

  renderBarTops = config => {
    const { data, width, height, paddingTop, paddingRight } = config;
    const baseHeight = this.calcBaseHeight(data, height);
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const barWidth = 32 * this.getBarPercentage();
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />
      );
    });
  };

  renderYAxisTitle = config => {
    return (
      <Text
        fillOpacity={this.props.yAxisTitleOpacity}
        fontWeight={this.props.yAxisTitleWeight}
        rotation={-90}
        x={-1*config.height/2}
        y={config.paddingRight/3}
      >
        {this.props.yAxisTitle}
      </Text>
    );
  };

  renderXAxisTitle = config => {
    return (
      <Text
        fillOpacity={this.props.xAxisTitleOpacity}
        fontWeight={this.props.xAxisTitleWeight}
        x={(config.width+94)/2-this.props.xAxisTitle.length*2}
        y={config.height}
      >
        {this.props.xAxisTitle}
      </Text>
    );
  };

  render() {
    const {
      width,
      height,
      data,
      style = {},
      withHorizontalLabels = true,
      withVerticalLabels = true,
      verticalLabelRotation = 0,
      horizontalLabelRotation = 0,
      withInnerLines = true,
      yAxisTitle = "hello"
    } = this.props;
    const { borderRadius = 0, paddingTop = 16, paddingRight = 94 } = style;
    const config = {
      width,
      height,
      verticalLabelRotation,
      horizontalLabelRotation
    };
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
                  ...config,
                  count: 4,
                  data: data.datasets[0].data,
                  paddingTop,
                  paddingRight
                })
              : null}
          </G>
          <G>
            {yAxisTitle
              ? this.renderYAxisTitle({
                  ...config,
                  labels: data.labels,
                  paddingRight,
                  paddingTop,
                  horizontalOffset: barWidth * this.getBarPercentage()
                })
              : null}
          </G>
          <G>
            {yAxisTitle
              ? this.renderXAxisTitle({
                  ...config,
                  labels: data.labels,
                  paddingRight,
                  paddingTop,
                  horizontalOffset: barWidth * this.getBarPercentage()
                })
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels({
                  ...config,
                  labels: data.labels,
                  paddingRight,
                  paddingTop,
                  horizontalOffset: barWidth * this.getBarPercentage()
                })
              : null}
          </G>
          <G>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              datasets: data.datasets,
              paddingTop,
              paddingRight
            })}
          </G>
          <G>
          {this.renderBelowBars({
              ...config,
              data: data.datasets[0].data,
              datasets: data.datasets,
              paddingTop,
              paddingRight
            })}
          </G>
        </Svg>
      </View>
    );
  }
}

export default BarChart;
