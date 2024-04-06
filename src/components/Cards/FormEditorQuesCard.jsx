import { GrDrag } from "react-icons/gr";
import { Checkbox, FormControlLabel, Radio } from "@mui/material";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

const FormEditorQuesCard = ({
  _form,
  triggerQuesDelete,
  triggerQuesEdit,
  index,
}) => {
  return (
    <div className="relative w-full rounded-lg border bg-white flex min-h-[100px] px-5 py-5 gap-5">
      <div className="h-[100px] flex items-center justify-center cursor-grab">
        <GrDrag size={20} />
      </div>
      <div className="flex flex-col w-full gap-5">
        <span className="text-3xl font-bold text-gray-700">
          Q{index + 1}. {_form["Question Text"]}
        </span>
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col flex-grow">
            Options
            <div className="text-sm flex gap-x-8 gap-y-1 flex-wrap">
              {_form.Option.map((_opt, i) => (
                <p className="flex items-center gap-1 pl-5" key={i}>
                  <li>{_opt}</li>
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            Type
            <div className="italic text-lg">{_form.Type}</div>
          </div>
          <div className="flex flex-col flex-grow">
            Preview
            <div className="flex gap-x-5 flex-wrap">
              {_form.Type === "Checkbox" &&
                _form.Option.map((_opt, i) => (
                  <FormControlLabel
                    key={i}
                    control={<Checkbox />}
                    label={_opt}
                  />
                ))}
              {_form.Type === "Radio" &&
                _form.Option.map((_opt, i) => (
                  <FormControlLabel key={i} label={_opt} control={<Radio />} />
                ))}
              {_form.Type === "Dropdown" && (
                <select
                  className="mt-1 block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue=""
                  // onChange={(e) => {
                  //   // Handle selection change here
                  // }}
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
      </div>
      <div className="absolute top-0 right-0 z-[99] flex items-center justify-center gap-3 mt-2 mr-2">
        <button
          type="button"
          className="bg-green-600 p-1 rounded cursor-pointer"
          onClick={triggerQuesEdit}
        >
          <MdModeEditOutline color="#fff" size={20} />
        </button>
        <button
          type="button"
          className="bg-red-600 p-1 rounded cursor-pointer"
          onClick={triggerQuesDelete}
        >
          <MdDelete color="#fff" size={20} />
        </button>
      </div>
    </div>
  );
};

export default FormEditorQuesCard;
