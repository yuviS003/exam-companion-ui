import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const FormResponseQuesCard = ({
  _form,
  index,
  handleCheckboxChange,
  handleRadioChange,
  handleDropDownChange,
}) => {
  return (
    <div className="w-full min-w-[700px] flex min-h-[100px] py-5">
      <div className="flex flex-col w-full gap-2">
        <span className="text-3xl font-bold">
          Q{index + 1}. {_form["Question Text"]}
        </span>
        <div className="flex flex-col max-h-[200px] flex-wrap">
          {_form.Type === "Checkbox" &&
            _form.Option.map((_opt, i) => (
              <FormControlLabel
                key={i}
                control={<Checkbox />}
                label={_opt}
                value={_opt}
                onChange={(e) => {
                  handleCheckboxChange(e.target.value, e.target.checked, index);
                }}
              />
            ))}
          {_form.Type === "Radio" && (
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={_form.Answer[0]}
                onChange={(e) => {
                  handleRadioChange(e.target.value, index);
                }}
              >
                {_form.Option.map((_opt, i) => (
                  <FormControlLabel
                    key={i}
                    label={_opt}
                    control={<Radio />}
                    value={_opt}
                    onChange={(e) => {
                      handleRadioChange(e.target.value, index);
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {/* {_form.Type === "Radio" &&
            _form.Option.map((_opt, i) => (
              <FormControlLabel
                key={i}
                label={_opt}
                control={<Radio />}
                value={_opt}
                onChange={(e) => {
                  handleRadioChange(e.target.value, index);
                }}
              />
            ))} */}
          {_form.Type === "Dropdown" && (
            <select
              className="mt-1 block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline max-w-[400px]"
              defaultValue=""
              value={_form.Answer[0]}
              onChange={(e) => {
                handleDropDownChange(e.target.value, index);
              }}
            >
              <option value="" disabled>
                Select your option
              </option>
              {_form.Option.map((_opt, i) => (
                <option key={i} value={_opt}>
                  {_opt}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormResponseQuesCard;
