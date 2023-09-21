import React, { useEffect, useState, useRef } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Toggle from "@radix-ui/react-toggle";
import * as Toast from "@radix-ui/react-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import html2canvas from "html2canvas";
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
  const [width, setWidth] = useState("212");
  const [enableImage, setEnableImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
  const handleEnableImage = () => {
    setEnableImage((prevState) => !prevState);
  };
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const exportRef = useRef();
  const timerRef = useRef(0);

  const generateOutputCode = () => {
    let tableClass = "wf";
    let outlookWidth = 165;
    let minWidth = "min-width:212px;";
    let overflow = "";

    if (layout === "x1") {
      tableClass = "w50";
      minWidth = "min-width:212px;";
      setWidth(212);
      outlookWidth = 165;
      overflow = "";
    } else if (layout === "x2") {
      tableClass = "wf";
      minWidth = "";
      setWidth(212);
      outlookWidth = 165;
      overflow = "";
    } else if (layout === "x3") {
      tableClass = "wf";
      minWidth = "";
      setWidth(158);
      outlookWidth = 112.5;
      overflow = "white-space: nowrap; overflow: hidden";
    } else {
      tableClass = "wf";
      minWidth = "min-width:418px;";
      setWidth(424);
      outlookWidth = 336;
      overflow = "";
    }

    const code = `
    <table class="${tableClass}" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin: 0 auto; width: ${width}px; max-width: ${width}px;">
    <tr>
      <td align="center" style="margin: 0; padding-left: 3px; padding-right: 3px;">
        <div>
        <!--[if mso]>
        ${
          enableImage
            ? `<table class="wf" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;">
            <td style="font-size: 1px; line-height: 0px;">&nbsp;</td>
          </table>
          <a href="${url}" 
            om:linkname="${linkName}" 
            target="_blank">
            <img src="${imageUrl}" 
              border="0" 
              style="display:block; 
              margin:0 auto; 
              max-width:${width - 6}px; 
              padding:0px;" 
              width="${width - 6}" 
              height="auto">
          </a>`
            : `<v:rect 
            xmlns:v="urn:schemas-microsoft-com:vml" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            href="${url}" 
            style="height:26.25pt;
              v-text-anchor:middle;
              width:${outlookWidth}pt;" 
            strokeweight="1.5pt"
            strokecolor="#${strokeColor}" 
            fillcolor="#${fillColor}">
            <w:anchorlock/>
            <center 
              style="color:#${textColor};
              font-family:sans-serif;
              font-size:12px;
              font-weight:bold;">
              ${label}
            </center>
          </v:rect>`
        }
        
    <![endif]-->
    <a href="${url}" target="_blank" om:linkname="${linkName}" style="

      width:100%;
      ${minWidth}
      line-height:35px;

      background-color:#${fillColor};
      border:1.5pt solid #${strokeColor};
      border-radius: 1px;
      color:#${textColor};

      font-family: brandon, Arial, sans-serif;
      font-weight: bold;
      font-size: 12px;
      text-align: center;
      text-transform: uppercase;
      text-decoration: none;

      -webkit-text-size-adjust:none;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -ms-box-sizing: border-box;
      box-sizing: border-box;
      mso-hide:all; 
      display:inline-block;
      " om:linkid="13:0">${label}</a></div>

        </td>
      </tr>
    </table>`;
    setOutputCode(code);
  };

  useEffect(() => {
    generateOutputCode();
  }, [layout, url, strokeColor, fillColor, textColor, label, linkName, width, enableImage, imageUrl]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const exportAsImage = (el, imageFileName) => {
    html2canvas(el, { useCORS: true }).then((canvas) => {
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          downloadImage(url, imageFileName);
        },
        "image/png",
        1.0
      );
    });
  };

  const downloadImage = (url, fileName) => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

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
          <div className="labelContainer" ref={exportRef}>
            <p className="label" style={{ color: "#" + textColor, width: width * 2 + 2 + "px", border: "1.5pt solid #" + strokeColor, backgroundColor: "#" + fillColor }}>
              {label}
            </p>
          </div>
        </div>

        <div className="image-url-container">
          <div className="image-buttons-container">
            <Toggle.Root className="Toggle" onClick={handleEnableImage}>
              Enable Image
            </Toggle.Root>
            <button className="Toggle" onClick={() => exportAsImage(exportRef.current, label)}>
              Capture Image
            </button>
          </div>
          <input className="input" id="ctaImageUrl" type="text" placeholder="Image URL" onChange={handleImageUrlChange} />
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
