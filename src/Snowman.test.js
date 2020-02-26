import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";
import img0 from "./0.png";
import img1 from "./1.png";

it("renders without crashing", function () {
    render(<Snowman />);
});

it("matches snapshot for initial gamestate", function () {
    const { asFragment } = render(<Snowman words={["apple"]} />);
    expect(asFragment()).toMatchSnapshot();
});

it("image changes to img1 after incorrect guess", function () {
    const { queryByAltText, getByText } = render(<Snowman />);

    expect(queryByAltText("img0")).toBeInTheDocument();

    const wrongButton = getByText("z")
    fireEvent.click(wrongButton)

    expect(queryByAltText("img0")).not.toBeInTheDocument();
    expect(queryByAltText("img1")).toBeInTheDocument();
});

it("game will display 'You Lose' and remove button area when max wrong reached", function () {
    const { getByText } = render(<Snowman images={[{ img0 }, { img1 }]} />);

    const wrongButton = getByText("z")
    fireEvent.click(wrongButton)

    expect(getByText("You lose!")).toBeInTheDocument();
    expect(wrongButton).not.toBeInTheDocument();
})

it("matches snapshot for game over", function () {
    const { asFragment } = render(<Snowman images={[{ img0 }]} words={["apple"]} />);
    expect(asFragment()).toMatchSnapshot();
});

it("game will update when restart is clicked", function () {
    const { getByText } = render(<Snowman words={["apple"]} />);

    const aButton = getByText("a")
    const wrongButton = getByText("z")
    const restartButton = getByText("Restart")
    fireEvent.click(aButton)
    fireEvent.click(wrongButton)
    fireEvent.click(restartButton)

    expect(getByText("Incorrect guesses: 0")).toBeInTheDocument();
    expect(getByText("_____")).toBeInTheDocument();

})