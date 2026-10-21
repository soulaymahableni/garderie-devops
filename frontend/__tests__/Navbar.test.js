import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  it("affiche le titre « Ma Garderie »", () => {
    render(<Navbar />);
    expect(screen.getByText("Ma Garderie")).toBeInTheDocument();
  });

  it("affiche le menu de navigation", () => {
    render(<Navbar />);
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });
});
