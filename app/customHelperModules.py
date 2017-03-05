def first_row_excel_length(row_array):
    count = 0
    for i in row_array:
        if i != '':
            count+=1
    return count

