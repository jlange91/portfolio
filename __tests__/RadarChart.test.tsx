import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RadarChart from "@/components/ui/RadarChart";

const points = [
  { label: "Front-end", value: 95 },
  { label: "Frameworks", value: 90 },
  { label: "Build", value: 78 },
  { label: "Architecture", value: 85 },
  { label: "Back-end", value: 62 },
  { label: "Cloud", value: 68 },
  { label: "Méthodes", value: 80 },
];

describe("RadarChart", () => {
  it("renders an SVG element", () => {
    const { container } = render(<RadarChart points={points} ariaLabel="Radar chart" />);
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders one label per data point", () => {
    const { getAllByText } = render(<RadarChart points={points} ariaLabel="Radar chart" />);
    for (const p of points) {
      expect(getAllByText(p.label).length).toBeGreaterThan(0);
    }
  });

  it("renders the correct number of axis lines", () => {
    const { container } = render(<RadarChart points={points} ariaLabel="Radar chart" />);
    const lines = container.querySelectorAll("line");
    expect(lines.length).toBe(points.length);
  });

  it("has accessible aria-label", () => {
    const { container } = render(<RadarChart points={points} ariaLabel="Radar chart" />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("aria-label")).toBe("Radar chart");
  });
});
