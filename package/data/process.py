import os
import package.data as data


def process_LF_data(network="ChapelCross", option="Opt5"):
    net_opt_dir = '\\'.join([data.dir_restoration_steps, '{}_{}'.format(network, option)])

    if not os.path.exists(net_opt_dir):
        os.makedirs(net_opt_dir)

    dict_data = data.read_LF_file(network, option)
    for component in dict_data:
        for parameter in dict_data[component]:
            dir_data = '\\'.join([net_opt_dir, '{}_{}.csv'.format(component, parameter)])
            df_data = dict_data[component][parameter]['data'].fillna(-9999)
            df_data.to_csv(dir_data, index=False)


if __name__ == '__main__':
    process_LF_data()