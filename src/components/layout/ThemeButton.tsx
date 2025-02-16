import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useEffect } from "react";
import { themeActions } from "../../redux/slice/theme";


const ThemeButton = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.mode)

  const applyTheme = (theme: 'theme0' | 'theme1' | 'theme2') => {
    const htmlEl = document.querySelector('html');
    if(!htmlEl) return;

    htmlEl.classList.remove('theme0', 'theme1', 'theme2');
    htmlEl.classList.add(theme);
  }

  const changeTheme = (theme: 'theme0' | 'theme1' | 'theme2') => {
    dispatch(themeActions.setTheme(theme))
    applyTheme(theme)
  }

  useEffect(() => {
    applyTheme(currentTheme)
  }, [ currentTheme ])

  
  return (
    <div className="flex space-x-2">
      <button onClick={() => changeTheme('theme0')} className="p-2 bg-white border rounded-full"> </button>
      <button onClick={() => changeTheme('theme1')} className="p-2 bg-yellow-500 border rounded-full"> </button>
      <button onClick={() => changeTheme('theme2')} className="p-2 bg-black border rounded-full"> </button>
    </div>
  )
}

export default ThemeButton
