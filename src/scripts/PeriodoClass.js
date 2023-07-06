export default class Periodo {

    
    

//     const onSave = () => {
//         if (modeForm === "create") {
          
//           if (listaPeriodos === null) {
//             periodo.id = 1;
//             setListaPeriodos([periodo]);
//           } else {
//             periodo.id = listaPeriodos.length + 1;
//             setListaPeriodos([...listaPeriodos, periodo]);
//           }
//         }
    
//         if (modeForm === "edit") {
//           const pAux = listaPeriodos.find((p) => p.id === periodo.id);
//           pAux.periodo = periodo.periodo;
//           pAux.materias = periodo.materias;
//           setListaPeriodos([...listaPeriodos]);
//         }
//         localStorage.setItem("lPeriodo", JSON.stringify(listaPeriodos));
//         onNew();
//       };
    
//       const onEdit = (pAux) => {
//         setPeriodo(pAux);
//         setModeForm("edit");
//       };
    
//       const onNew = () => {
//         setModeForm("create");
//         setPeriodo({ periodo:"", materias:"" });
//       };
    
//       const onRemove = (pRemove) => {
//         const idx = listaPeriodos.findIndex((p) => p.id === pRemove.id);
//         listaPeriodos.splice(idx, 1);
//         setListaPeriodos([...listaPeriodos]);
//         localStorage.setItem("lPeriodo", JSON.stringify(listaPeriodos));
//       };
    
//       const onCancel = () => {
//         onNew()
//       };
// }