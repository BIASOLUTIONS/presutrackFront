

const textFields = {
    body: {
        noMatch: "No hay datos para presentar.",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column:any) => `Ordenar por ${column.label}`,
        title: 'Número'
    },
    pagination: {
        next: "Siguiente página",
        previous: "Página anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
    },
    toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Columnas visibles",
        filterTable: "Filtrar tabla",
    },
    filter: {
        all: "TODOS",
        title: "FILTROS",
        reset: "REINICIAR",
    },
    viewColumns: {
        title: "Columnas visibles",
        titleAria: "Mostrar/ocultar columnas",
    },
    selectedRows: {
        text: "Fila(s) seleccionada(s)",
        delete: "Borrar",
        deleteAria: "Borrar filas seleccionadas",
    },
};

export default textFields;