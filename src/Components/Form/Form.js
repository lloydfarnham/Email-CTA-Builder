import React, { useEffect, useState, useRef } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Toast from "@radix-ui/react-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./Radix.css";
import "./Form.css";

function Form() {
  const [layout, setLayout] = useState("x1");
  const [url, setUrl] = useState("{{url}}");
  const [strokeColor, setStrokeColor] = useState("081f2c");
  const [fillColor, setFillColor] = useState("081f2c");
  const [textColor, setTextColor] = useState("ffffff");
  const [label, setLabel] = useState("LINK HERE");
  const [linkName, setLinkName] = useState("");
  const [width, setWidth] = useState("206");
  const [open, setOpen] = useState(false);
  const [outputCode, setOutputCode] = useState("");
  const handleUrlChange = (event) => {
    let value = event.target.value.toLowerCase();
    const linkNameInput = document.getElementById("LinkName");
    let url;
    let name;

    if (value === "ww all") {
      url = "https://www.crewclothing.co.uk/womens/all-womens-clothing-accessories-and-footwear/";
      name = "Womens All Clothing";
      linkNameInput.value = name;
    } else if (value === "mw all") {
      url = "https://www.crewclothing.co.uk/mens/mens-all-clothing-accessories-footwear/";
      name = "Mens All Clothing";
      linkNameInput.value = name;
    } else if (value === "bw all") {
      url = "https://www.crewclothing.co.uk/kids/boys/";
      name = "Boys All Clothing";
      linkNameInput.value = name;
    } else if (value === "gw all") {
      url = "https://www.crewclothing.co.uk/kids/girls/";
      name = "Girls All Clothing";
      linkNameInput.value = name;
    } else if (value === "kids all") {
      url = "https://www.crewclothing.co.uk/kids/kids-clothing-accessories-and-footwear/";
      name = "Kids All Clothing";
      linkNameInput.value = name;
    } else if (value === "ww new") {
      url = "https://www.crewclothing.co.uk/new-in/new-in-for-her/";
      name = "Womens New In";
      linkNameInput.value = name;
    } else if (value === "mw new") {
      url = "https://www.crewclothing.co.uk/new-in/new-in-for-him/";
      name = "Mens New In";
      linkNameInput.value = name;
    } else if (value === "ww sale") {
      url = "https://www.crewclothing.co.uk/sale/womens-sale/";
      name = "Womens Sale";
      linkNameInput.value = name;
    } else if (value === "mw sale") {
      url = "https://www.crewclothing.co.uk/sale/mens-sale/";
      name = "Mens Sale";
      linkNameInput.value = name;
    } else if (value === "gw sale") {
      url = "https://www.crewclothing.co.uk/kids/girls/girls-all-sale/";
      name = "Girls Sale";
      linkNameInput.value = name;
    } else if (value === "bw sale") {
      url = "https://www.crewclothing.co.uk/kids/boys/boys-all-sale/";
      name = "Boys Sale";
      linkNameInput.value = name;
    } else if (value === "kids sale") {
      url = "https://www.crewclothing.co.uk/kids/kids-sale/";
      name = "Kids Sale";
      linkNameInput.value = name;
    } else if (value === "all sale") {
      url = "https://www.crewclothing.co.uk/sale/all-sale/";
      name = "All Sale";
      linkNameInput.value = name;
    } else {
      url = value;
      name = "";
      linkNameInput.value = name;
    }

    setUrl(url);
    setLinkName(name);
    event.target.value = url;
  };
  const handleColorChange = (event, setColor) => {
    let value = event.target.value.toLowerCase();
    let color;

    if (value === "white") {
      color = "ffffff";
    } else if (value === "navy") {
      color = "081f2c";
    } else if (value === "cream") {
      color = "f3eee8";
    } else if (value === "dove") {
      color = "e2e8ee";
    } else {
      color = value;
    }

    setColor(color);
    event.target.value = color;
  };
  const handleStrokeColorChange = (event) => {
    handleColorChange(event, setStrokeColor);
  };
  const handleFillColorChange = (event) => {
    handleColorChange(event, setFillColor);
  };
  const handleTextColorChange = (event) => {
    handleColorChange(event, setTextColor);
  };
  const handleLabelChange = (event) => {
    setLabel(event.target.value.toUpperCase().replace("'", "’"));
  };
  const handleLinkNameChange = (event) => {
    const value = event.target.value;

    if (value.includes("_")) {
      // If the input contains an underscore, capitalize all letters
      const newValue = value.replace(/[^_]/g, (match) => match.toUpperCase());
      setLinkName(newValue);
      event.target.value = newValue;
    } else {
      // If there's no underscore, capitalize first letter of every word, and lowercase the rest
      const newValue = value
        .toLowerCase()
        .replace(/\b\w/g, (match) => match.toUpperCase())
        .replace(/\B\w/g, (match) => match.toLowerCase());

      setLinkName(newValue);
      event.target.value = newValue;
    }
  };

  const timerRef = useRef(0);

  const generateOutputCode = () => {
    let tableClass = "wf";
    let overflow = "";

    if (layout === "x1") {
      tableClass = "w50";
      setWidth(206);
      overflow = "";
    } else if (layout === "x2") {
      tableClass = "wf";
      setWidth(206);
      overflow = "";
    } else if (layout === "x3") {
      tableClass = "wf";
      setWidth(152);
      overflow = "white-space: nowrap; overflow: hidden";
    } else {
      tableClass = "wf";
      setWidth(418);
      overflow = "";
    }

    const code = `<table class="${tableClass}" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation" width="${width}" style="width: ${width}px; min-width: ${width}px; background-color: #${fillColor}; border: 1.5pt solid #${strokeColor}">
  <tr>
    <td class="button" align="center">
      <a href="${url}" om:linkname="${linkName}" style="display: inline-block; font-weight: bold; color: #${textColor}; padding: 9px 0px 9px 0px; mso-padding-alt: 0; font-size: 12px; text-align: center; text-decoration: none; width: 100%; ${overflow}" target="_blank"><!--[if mso]><i style="letter-spacing:20px;mso-font-width:-100%;mso-text-raise:18px;">&nbsp;</i><span style="mso-text-raise:9px;"><![endif]-->
        ${label}
        <!--[if mso]></span><i style="letter-spacing:20px;mso-font-width:-100%;">&nbsp;</i><![endif]--></a>
    </td>
  </tr>
</table>`;
    setOutputCode(code);
  };

  useEffect(() => {
    generateOutputCode();
  }, [layout, url, strokeColor, fillColor, textColor, label, linkName, width]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="form">
      <div className="container">
        <div className="layout-options">
          <ToggleGroup.Root
            className="ToggleGroup"
            type="single"
            value={layout}
            onValueChange={(layout) => {
              if (layout) setLayout(layout);
            }}
          >
            <ToggleGroup.Item value="x1" className="ToggleGroupItem">
              X1
            </ToggleGroup.Item>
            <ToggleGroup.Item value="x2" className="ToggleGroupItem">
              X2
            </ToggleGroup.Item>
            <ToggleGroup.Item value="x3" className="ToggleGroupItem">
              X3
            </ToggleGroup.Item>
            <ToggleGroup.Item value="double" className="ToggleGroupItem">
              D
            </ToggleGroup.Item>
          </ToggleGroup.Root>

          <Toast.Provider swipeDirection="right">
            <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
              <Toast.Title className="ToastTitle">Copied to clipboard</Toast.Title>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />

            <button
              className="Toggle"
              onClick={() => {
                navigator.clipboard.writeText(outputCode);
                setOpen(false);
                window.clearTimeout(timerRef.current);
                timerRef.current = window.setTimeout(() => {
                  setOpen(true);
                }, 100);
              }}
            >
              Copy Code
            </button>
          </Toast.Provider>
        </div>

        <input className="input" id="Url" type="text" placeholder="URL" onChange={handleUrlChange} />
        <div className="color-inputs">
          <div className="color-container">
            <input className="input" id="StrokeColor" type="text" placeholder="Stroke Colour" onChange={handleStrokeColorChange} />
            <div className="color" id="StrokeColourDisplay" style={{ backgroundColor: "#" + strokeColor }}></div>
          </div>
          <div className="color-container">
            <input className="input" id="FillColor" type="text" placeholder="Fill Colour" onChange={handleFillColorChange} />
            <div className="color" id="FillColorDisplay" style={{ backgroundColor: "#" + fillColor }}></div>
          </div>
          <div className="color-container">
            <input className="input" id="TextColor" type="text" placeholder="Text Colour" onChange={handleTextColorChange} />
            <div className="color" id="TextColorDisplay" style={{ backgroundColor: "#" + textColor }}></div>
          </div>
        </div>
        <input className="input" id="Label" type="text" placeholder="Label" onChange={handleLabelChange} />
        <input className="input" id="LinkName" type="text" placeholder="Link Name" onChange={handleLinkNameChange} />
        <div className="preview">
          <div className="labelContainer">
            <p className="label" style={{ color: "#" + textColor, width: width * 2 + 2 + "px", border: "3pt solid #" + strokeColor, backgroundColor: "#" + fillColor }}>
              {label}
            </p>
          </div>
        </div>
      </div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="round-button">?</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Help</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Link shortcuts:
              <table>
                <tr>
                  <td>ww all</td>
                  <td>Women’s All Clothing</td>
                </tr>
                <tr>
                  <td>mw all</td>
                  <td>Men’s All Clothing</td>
                </tr>
                <tr>
                  <td>bw all</td>
                  <td>Boys’ All Clothing</td>
                </tr>
                <tr>
                  <td>gw all</td>
                  <td>Girls’ All Clothing</td>
                </tr>
                <tr>
                  <td>kids all</td>
                  <td>Kids’ All Clothing</td>
                </tr>
                <tr>
                  <td>ww new</td>
                  <td>Women’s New In</td>
                </tr>
                <tr>
                  <td>mw new</td>
                  <td>Men’s New In</td>
                </tr>

                <tr>
                  <td>ww sale</td>
                  <td>Women’s Sale</td>
                </tr>
                <tr>
                  <td>mw sale</td>
                  <td>Men’s Sale</td>
                </tr>
                <tr>
                  <td>bw sale</td>
                  <td>Boys’ Sale</td>
                </tr>
                <tr>
                  <td>gw sale</td>
                  <td>Girls’ Sale</td>
                </tr>
                <tr>
                  <td>kids sale</td>
                  <td>Kids’ Sale</td>
                </tr>
                <tr>
                  <td>all sale</td>
                  <td>All Sale</td>
                </tr>
              </table>
            </Dialog.Description>
            <Dialog.Description className="DialogDescription">
              Colour Shortcuts:
              <table>
                <tr>
                  <td>navy</td>
                  <td style={{ backgroundColor: "#081f2c" }}></td>
                </tr>
                <tr>
                  <td>white</td>
                  <td style={{ backgroundColor: "#ffffff" }}></td>
                </tr>
                <tr>
                  <td>cream</td>
                  <td style={{ backgroundColor: "#f3eee8" }}></td>
                </tr>
                <tr>
                  <td>dove</td>
                  <td style={{ backgroundColor: "#e2e8ee" }}></td>
                </tr>
              </table>
            </Dialog.Description>
            <Dialog.Description className="DialogDescription">
              Background block guide:
              <ol>
                <li>Enter all fields for desired CTA</li>
                <li>Click capture image to download the CTA as image</li>
                <li>Upload image into Ometria and copy the URL for image</li>
                <li>Paste URL into the 'Image URL' field</li>
                <li>Select 'Enable Image'</li>
                <li>For desktop code: hit 'Copy Code' and paste code into desired location, making sure to place inside the th elements if using a x2 or x3 layout</li>
                <li>For mobile code: uncheck 'Enable Image', hit 'Copy Code' and paste into desired location.</li>
              </ol>
            </Dialog.Description>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default Form;
