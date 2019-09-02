import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { textColorDark, colorLight,inputBackgroundColor, borderColor, inputBackgroundColorHover } from './../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
`;

const Label = styled.label`
  border-radius: 6px;
  padding: 1px;
  height: 40px;
  display: flex;
  border: 1px solid ${borderColor};
  background-color: ${inputBackgroundColor};
  :hover {background: ${inputBackgroundColorHover}}
`;

const Input = styled.input`
  color: ${textColorDark};
  width: 100%;
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  border-style: none;
  font-size: 0.9rem;
  :focus {outline:0;}
`;

const IconWrapper = styled.span`
  padding: 10px;
`;

const Drawer = styled.ul`
  position: absolute;
  margin-top: -5px;
  list-style: none;
  padding: 0;
  width: ${props => { return props.theme.mode === 'light' ? '284px' : `282px`}};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 12px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  background: ${colorLight};
  z-index: 1;
  border: ${props => { return props.theme.mode === 'light' ? 'none' : `1px solid ${borderColor(props)}`}};
`

export default ({value, onChange, children, isEditing, hasItems}) => {
  const nodeRef = useRef();
  const inputRef = useRef();
  const [firstRender, setFirstRender] = useState(true);
  const { open, openList, closeList } = useOpenList(nodeRef);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(true);
      return;
    }
    if (isEditing) {
      inputRef.current.focus();
      openList();
    }
  }, [isEditing]);

  return (
    <Wrapper ref={nodeRef}>
      <Label onClick={openList}>
        {
          isEditing ? (
            <IconWrapper>
              <FontAwesomeIcon icon={faSearch} />
            </IconWrapper>
          ) : (
            <IconWrapper>You</IconWrapper>
          )
        }
        <Input ref={inputRef} value={value} onChange={onChange} />
      </Label>
      {
        open && hasItems && (
          <Drawer>
            { React.Children.map(children, child => child && React.cloneElement(child, {closelist: closeList})) }
          </Drawer>
        )
      }
    </Wrapper>
  )
}

const DrawerItem = styled.li`
  border-bottom-color: ${inputBackgroundColorHover};
  cursor: pointer;
  display: flex;
  :hover {background: ${inputBackgroundColorHover}};
`;
const DrawerItemContent = styled.div`
  padding: 10px;
  font-size: 12px;
`;
const DrawerItemIcon = styled.div`
  padding: 10px 0 10px 10px;
`;

export const DropDownItem = ({children, onClick, closelist, icon}) => {
  const doAction = () => {
    if (onClick !== undefined) {
      closelist()
      onClick()
    }
  }
  return (
    <DrawerItem onClick={doAction}>
      { icon && <DrawerItemIcon>{ icon }</DrawerItemIcon> }
      <DrawerItemContent>{children}</DrawerItemContent>
    </DrawerItem>
  );
}

const DrawerItemDivider = styled.div`
  border-bottom: 1px solid ${borderColor};
  padding: 4px 10px;
`;

export const DropDownItemDivider = ({value}) => (
  <DrawerItemDivider>
    <div className="dd-list-divider-content">{value}</div>
  </DrawerItemDivider>
);

const useOpenList = (node) => {
  const [open, setOpen] = useState(false);

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false)
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function openList(){
    setOpen(true)
  }
  function closeList(){
    setOpen(false)
  }

  return {
    open,
    openList,
    closeList,
  };
};

