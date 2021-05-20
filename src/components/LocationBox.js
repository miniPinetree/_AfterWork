import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import locationOpts from "../shared/locationOpts";
import Swal from "sweetalert2";

const LocationBox = (props) => {
  const { search, locations, setSearch, setLocations } = props;
  const user = useSelector((state) => state.user.user);
  const inputStyle = {
    borderRadius: "29px",
    font: "normal normal normal 20px/30px Noto Sans CJK KR",
    letterSpacing: "-0.6px",
    color: "#606060",
    boxSizing: "border-box",
    padding: "9px 27px 12px 27px",
  };
  React.useEffect(() => {
    if (locations.length === 0 && user.locations.length > 0) {
      const locationNames = user.locations.map((location) => location.name);
      setLocations(locationNames);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //검색 키워드가 포함된 선택가능지역 리스트
  let searchedLocation = locationOpts.filter((option) => {
    return option.includes(search);
  });
  //선택가능지역 클릭하여 추가
  const selectLocation = (val) => {
    if (locations.length >= 4) {
      Swal.fire({
        text: "관심지역은 4개까지 설정 가능합니다.",
        confirmButtonColor: "#7F58EC",
        confirmButtonText: "확인",
      });
      setSearch("");
    } else {
      let _location = val.split(" ");
      _location = _location[1] && _location[1] !=="전체" ? _location[1] : _location[0];
      if(locations.includes(_location)){
        Swal.fire({
          text: "이미 등록된 지역입니다.",
          confirmButtonColor: "#7F58EC",
          confirmButtonText: "확인",
        });
        setSearch("");
      }else{
        setLocations([...locations, _location]);
        setSearch("");
      };
    }
  };
  //선택가능지역이 하나이면 엔터로도 추가 가능
  const enterLocation = (e) => {
    if (e.keyCode !== 13) {
      return;
    } else {
      if (locations.length >= 4) {
        Swal.fire({
          text: "관심지역은 4개까지 설정 가능합니다.",
          confirmButtonColor: "#7F58EC",
          confirmButtonText: "확인",
        });
      } else {
        if (searchedLocation.length === 1) {
          let _location = searchedLocation[0].split(" ");
          _location = _location[1] && _location[1] !=="전체" ? _location[1] : _location[0];
          if(locations.includes(_location)){
            Swal.fire({
              text: "이미 등록된 지역입니다.",
              confirmButtonColor: "#7F58EC",
              confirmButtonText: "확인",
            });
            setSearch("");
          }else{
            setLocations([...locations, _location]);
            setSearch("");
          };
        };
      };
    }
  };
  const deleteLocation = (val) => {
    let _location = locations.filter((l) => {
      return l !== val;
    });
    setLocations(_location);
  };
  return (
    <>
      <AreaList>
        {locations?.map((location, idx) => {
          return (
            <Area>
              {location}
              <CloseOutlined
                onClick={() => {
                  deleteLocation(location);
                }}
              />
            </Area>
          );
        })}
      </AreaList>
      <hr color="#E8E8E8" />
      <Text>지역 추가하기</Text>
      <InputBox>
        <Input
          placeholder="지역을 입력하세요"
          suffix={
            <SearchOutlined
              style={{ color: "#000", cursor: "pointer" }}
              onClick={enterLocation}
            />
          }
          style={inputStyle}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyUp={(e) => {
            enterLocation(e);
          }}
          value={search}
        />

        {searchedLocation.length !== locationOpts.length ? (
          <Autofill>
            {searchedLocation.length === 0 ? (
              <p>서비스 지역이 아닙니다</p>
            ) : (
              <p>지역을 선택해주세요</p>
            )}
            {searchedLocation.map((location, idx) => {
              return (
                <div
                value={location}
                  onClick={(e) => {
                    const _location = e.target.getAttribute('value')
                    selectLocation(_location);
                  }}
                >
                  {location}
                </div>
              );
            })}
          </Autofill>
        ) : null}
      </InputBox>
    </>
  );
};
export default React.memo(LocationBox);

const AreaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0px;
`;
const Text = styled.p`
  font-size: 18px;
  margin: 0 0 16.5px 0;
  display: block;
  @media all and (max-width: 768px) {
    font-size: 18px;
  }
  @media all and (max-width: 414px) {
    font-size: 15px;
  }
`;
const Area = styled.div`
  display: flex;
  min-width: 60px;
  height: 28px;
  background-color: #eeeeee;
  font-size: 15px;
  padding: 3.5px 5px 2.5px 10px;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 10px 0;
  & svg {
    margin-left: 5px;
  }
  @media all and (max-width: 768px) {
    font-size: 14px;
    min-width: 56px;

    & svg {
      margin-left: 2px;
    }
  }
  @media all and (max-width: 414px) {
    font-size: 14px;
    min-width: 56px;

    & svg {
      margin-left: 2px;
    }
  }
`;
const InputBox = styled.div`
  position: relative;
  & span {
    background-color: #eeeeee;
    @media all and (max-width: 768px) {
        padding:3px 0px 5px;
      }
      @media all and (max-width: 414px) {
        padding:2px 0px 4px;
      }
  }
  & input {
    background-color: #eeeeee;
    margin-top: 4px;
    & .ant-input-affix-wrapper {
      @media all and (max-width: 414px) {
        padding: 5px 15px 7px;
      }
    }
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      font-size: 19px;
      @media all and (max-width: 768px) {
        font-size: 17px;
      }
      @media all and (max-width: 414px) {
        font-size: 15px;
      }
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      font-size: 19px;
      @media all and (max-width: 768px) {
        font-size: 17px;
      }
      @media all and (max-width: 414px) {
        font-size: 15px;
      }
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-size: 19px;
      @media all and (max-width: 768px) {
        font-size: 17px;
      }
      @media all and (max-width: 414px) {
        font-size: 15px;
      }
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      font-size: 19px;
      @media all and (max-width: 768px) {
        font-size: 17px;
      }
      @media all and (max-width: 414px) {
        font-size: 15px;
      }
    }
  }
`;
const Autofill = styled.div`
  width: 80%;
  max-height: 170px;
  overflow: auto;
  margin: 0 auto;
  padding: 0px 8px;
  font-size: 15px;
  position: absolute;
  left: 10%;
  background-color: #eeeeee;
  & p {
    background-color: #eeeeee;
    position: sticky;
    top: 0px;
    font-size: 15px;
    margin-bottom: 3px;
    font-weight: 600;
  }
  & div {
    cursor: pointer;
    :hover {
      color: #7f58ec;
    }
  }
  @media all and (max-width: 414px) {
    max-height: 107px;
      }
`;
