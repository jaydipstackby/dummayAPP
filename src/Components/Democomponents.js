
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  multiSelect, select, multiCollaborator, collaborator, dummyOptions,
  EMPTYVALUE, staticImagePAth, isEmpty, colorIsLight, ColorSelection
} from '../common'
import styles from '.././styles.module.scss';


export const selectStyles = styles

export const Select = ({ inputReference, value, option, onChange: setSelectedPops, type, className, setInviteNewCollaborator, isOpenOption, inputPlaceholder, colorDisable, disableColorCode }) => {
  const [selectedValue, setSelectedValue] = useState([...value])
  const [propsOptionsState, setPropsOptionsState] = useState([...dummyOptions, ...option])
  const [options, setOptions] = useState(propsOptionsState)
  const [inputValue, setInputValue] = useState('')
  const [count, setCount] = useState(0)
  const [valueIsExist, setValueIsExist] = useState(true)
  const [open, setOpen] = useState(isOpenOption ? isOpenOption : false)
  const [isOpenModel, setIsOpenModel] = useState(false)
  const inputRef = useRef()
 

  // const inputEl = useRef([]);

  useEffect(() => {
    if (!open) {
      setCount(0);
    }
  }, [open])

  const handleChangeAdd = () => {
    const isExist = selectedValue.filter(item => {
      if (inputValue === item.value) {
        return item.value
      }
    })
    if (isExist.length > 0) {
      alert("Option Already Exist !!!")
      return
    }

    const modifyData = { id: propsOptionsState.length + 1, label: inputValue, value: inputValue, color: ColorSelection[propsOptionsState.length].color, newCreate: true }
    setPropsOptionsState([...propsOptionsState, modifyData])
    setInputValue('')
    if (type === select) {
      setSelectedValue([modifyData])
      setSelectedPops(modifyData)
      setOptions(propsOptionsState)
    }
    else if (type === multiSelect) {
      setSelectedValue([...selectedValue, modifyData])
      setSelectedPops([...selectedValue, modifyData])
      const removeSameOption = selectedValue.map((io) => io.id);
      var result = propsOptionsState.filter(e => removeSameOption.indexOf(e.id) === -1)
      setOptions(result)
    }
  }

  useEffect(() => {
    if (!isEmpty(value) && (type === multiSelect || type === multiCollaborator)) {
      const removeSameOption = value.map((io) => io.id);
      var result = propsOptionsState.filter(e => removeSameOption.indexOf(e.id) === -1)
      setOptions(result)
    }
  }, [])

  const handleChangeInput = (payload) => {

    setInputValue(payload)
    if (type === multiCollaborator || type === collaborator) {
      const removeSameOption = selectedValue.map((io) => io.id);
      var result = propsOptionsState.filter(e => removeSameOption.indexOf(e.id) === -1)
      return setOptions(result.filter((x) => x.value.toUpperCase().includes(payload.toUpperCase())))
    }
    const isValue = options.filter((x) => x.value === payload)
    if (payload) {
      setOptions(options.filter((x) => x.value.includes(payload)))
    } else {
      const removeSameOption = selectedValue.map((io) => io.id);
      const result = propsOptionsState.filter(e => removeSameOption.indexOf(e.id) === -1)
      setOptions(result)
    }
    if (!isEmpty(isValue)) {
      setValueIsExist(false)
    } else {
      setValueIsExist(true)
    }

  }

  const handleChangeSelectOption = (payload) => {
    if (payload && payload.id === EMPTYVALUE) {
      setOptions(propsOptionsState)
      setSelectedValue([])
    } else {
      if (type === multiSelect || type === multiCollaborator) {
        const isExist = selectedValue.some((x) => x.id === payload.id)
        if (!isExist) {
          const removeSelectedOption = options.filter((obj) => {
            return obj.id !== payload.id;
          });
          setOptions(removeSelectedOption)
          setSelectedValue([...selectedValue, payload])
          setSelectedPops([...selectedValue, { id: payload.id, value: payload.value, label: payload.value }])
        }
      } else {
        setSelectedValue([])
        setSelectedPops([])
        setSelectedValue([payload])
        setSelectedPops([payload])
        setOpen(!open)
      }
    }
  }

  const headerClickCheck = e => {
    if (inputRef.current !== null && !inputRef.current.contains(e.target)) {
      setOpen(!open)
      setInputValue('')
    }

  }



  useEffect(() => {
    const selection = (type === multiSelect || type === multiCollaborator) ? "mousedown" : "click"
    if (open) {
      window.addEventListener(selection, headerClickCheck)
    }
    return () => {
      window.removeEventListener(selection, headerClickCheck)
    }

  }, [open])

  const removedItem = (id) => {
    const removeOptionItem = selectedValue.filter((obj) => {
      return obj.id !== id;
    });
    setSelectedValue(removeOptionItem)
    setSelectedPops(removeOptionItem)
    const findRemoveItem = propsOptionsState.filter(x => x.id === id)
    setOptions([...options, ...findRemoveItem])
    setOpen(true)
  }

  const handleInviteCollaborator = () => {
    const removeSameOption = selectedValue.map((io) => io.id);
    var result = propsOptionsState.filter(e => removeSameOption.indexOf(e.id) === -1)
    setOptions(result)
    setIsOpenModel(true)
    setOpen(false)
  }

  const setCloseModel = () => {
    setIsOpenModel(false);
  };

  const setModelData = (obj) => {
    setInviteNewCollaborator(obj)
    setIsOpenModel(false);
  };

  const removedAllItem = () => {
    setSelectedValue([])
    setSelectedPops([])
    setOptions(propsOptionsState)
    setOpen(true)
  }

  const handleFocus = (e) => {
    setOpen(true)
  }
  // const handleHover = (e) => {
  //   console.log("hover",e);
    
  //   inputEl.current.forEach((element, x) => {
  //     if (e === x) {
  //       element.style.background = "#cbeff5";
  //     } else {
  //       element.style.background = "white";
  //     }
  //   })
  // }
  
  const handleInputValue = (e) => {
    
    setInputValue(options[e].value)
  }

  const handleKeyPress = (e) => {
    let countCheck = count;

    if (e.keyCode === 38) {
    
      countCheck =countCheck === 0 ? options.length - 1 : countCheck - 1;
      setCount(countCheck);
      handleInputValue(countCheck)
      // handleHover(countCheck)
      // if (countCheck === -1) {
      //   setCount(options.length - 1)
      // }
    } else if (e.keyCode === 40 && countCheck < options.length) {
      countCheck = countCheck === options.length - 1 ? 0 : countCheck + 1;
      setCount(countCheck);
      handleInputValue(countCheck);
      // handleHover(countCheck);
      // if (countCheck >= options.length) {
      //   setCount(0)
      // }
    }

    if (e.keyCode === 13) {
      if (countCheck <= 1 && inputValue === "...Empty") {
        removedAllItem()
        setInputValue('');
      }
      else if (inputValue) {
        handleChangeAdd();
      }
      setOpen(false);
    }
 

    if (e.keyCode === 8) {
      if (inputValue) {
        setInputValue("")
        handleChangeInput();
      } else {
        selectedValue.pop();
        handleChangeInput();
      }
    }
  }

  return (
    <div ref={inputReference}>
      <div ref={inputRef} >
        <div className={className + ' ' + selectStyles.selectBoxMain} style={{ borderColor: (open ? "#2d7ff9" : "") }}>
          <div className={selectStyles.valueWrapper + ' ' + selectStyles.selectBoxMain} onClick={() => setOpen(true)}>
            {
              type === select && !isEmpty(selectedValue) && (
                <span className={selectStyles.selectedSpan} style={{ marginLeft: "10px", color: (colorIsLight(colorDisable ? (disableColorCode ? disableColorCode : "#9e9e9e") : selectedValue[0].color) ? "#ffffff" : "#000000"), background: colorDisable ? (disableColorCode ? disableColorCode : "#9e9e9e") : selectedValue[0].color }} >{selectedValue[0].label}</span>
              )
            }
            {
              type === multiSelect && !isEmpty(selectedValue) && (
                selectedValue.map((x, i) => {
                  return <span key={i} className={selectStyles.selectedSpan} style={{ marginLeft: "10px", color: (colorIsLight(colorDisable ? (disableColorCode ? disableColorCode : "#9e9e9e") : x.color) ? "#ffffff" : "#000000"), background: colorDisable ? (disableColorCode ? disableColorCode : "#9e9e9e") : x.color }}>{x.label} <span onClick={() => removedItem(x.id)}>??</span></span>
                })
              )
            }

            {/* //----------------------------------------------// */}

            {
              (type === select || type === multiSelect) &&
              <input className={selectStyles.selectInput} placeholder={inputPlaceholder} onKeyDown={(e) => handleKeyPress(e)} onFocus={(e) => handleFocus(e)} value={inputValue} onChange={(e) => handleChangeInput(e.target.value)} type="text" ></input>
            }
            {
              type === multiCollaborator && !isEmpty(selectedValue) && selectedValue.map((x, i) => {
                return <span key={i} className={selectStyles.collaborate}>
                  <img className={selectStyles.collaborateImage} src={x.profileImage || staticImagePAth} onError={e => { e.currentTarget.src = staticImagePAth; }} />
                  <label className={selectStyles.collaborateView}>
                    {x.label}
                    {
                      <span className={selectStyles.removeItem} onClick={() => removedItem(x.id)}>??</span>
                    }
                  </label>
                </span>
              })
            }
            {
              type === collaborator && !isEmpty(selectedValue) && <span className={selectStyles.collaborate}>
                <img className={selectStyles.collaborateImage} src={selectedValue[0].profileImage || staticImagePAth} onError={e => { e.currentTarget.src = staticImagePAth; }} />
                <label className={selectStyles.collaborateView}>
                  {selectedValue[0].label}
                </label>
              </span>
            }
            {
              (type === multiCollaborator || type === collaborator) &&
              <input className={selectStyles.selectInputCollaboration} placeholder={inputPlaceholder} value={inputValue} onChange={(e) => handleChangeInput(e.target.value)} type="text" />
            }
          </div>
          {
            (selectedValue.length > 0 && (type === multiSelect || type === multiCollaborator)) &&
            <div className={selectStyles.removeAllClass}>
              <span onClick={() => removedAllItem()}>??</span>
            </div>
          }
          <div className={selectStyles.arrowWrapper}>
            <div className={open ? (selectStyles.arrow + ' ' + selectStyles.arrowUp) : (selectStyles.arrow + ' ' + selectStyles.arrowDown)} onClick={() => setOpen(!open)}></div>
          </div>
        </div>
        <div style={{ borderColor: (open ? "#2d7ff9" : "") }} className={open ? (selectStyles.dropDown + ' ' + selectStyles.show) : (selectStyles.dropDown + ' ' + selectStyles.hide)}>
          {(type === select || type === multiSelect) &&
            <Fragment>
              {
                inputValue && valueIsExist &&
                <div className={selectStyles.addBtn} onClick={() => handleChangeAdd()}>Create  "{inputValue}"</div>
              }
              {!isEmpty(options) && options.map((x, i) => (
                <span key={x.id} value={x.value} className={selectStyles.itemComponent}
                  // ref={(el) => (inputEl.current[i] = el)}
                  style={{ backgroundColor:(count === i ? "#cbeff5":"white")  }}
                  onClick={() => handleChangeSelectOption(x)} >
                  <label className={selectStyles.labelView} style={{
                    color: (colorIsLight(colorDisable ? (disableColorCode ? disableColorCode : "#9e9e9e") : x.color) ? "#ffffff" : "#000000"),
                    background: colorDisable ? (disableColorCode ? disableColorCode : "#9e9e9e") : x.color
                  }}>
                    {x.label}
                  </label>
                </span>
              ))}
            </Fragment>
          }
          {(type === collaborator || type === multiCollaborator) && !isEmpty(options) && options.map(x => (
            <span key={x.id} className={selectStyles.collaborate + ' ' + selectStyles.collaborateOptions} onClick={() => handleChangeSelectOption(x)} >
              <img className={selectStyles.collaborateImage} src={x.image || staticImagePAth} onError={e => { e.currentTarget.src = staticImagePAth }} />
              <label className={selectStyles.collaborateView + ' ' + selectStyles.pr}>
                {x.label}
              </label>
            </span>
          ))}
          {
            (type === collaborator || type === multiCollaborator) && inputValue &&
            <div className={selectStyles.addBtn} onClick={() => handleInviteCollaborator()}>Invite new collaborate...</div>
          }
          {
            ((type === select || type === multiSelect) && options && options.length <= 0) && <div className={selectStyles.noMatch}>
              No matches found
            </div>
          }
        </div>
      </div>
      {/* {
          isOpenModel &&
          <ModelPopup setCloseModel={setCloseModel} setModelData={setModelData} />
        } */}
    </div>
  )
}

