import { Input } from 'antd';
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

function DynamicArrayForm() {
  // 初始化 useForm
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      platform: '', // 上架平台
      user: '', // 操作人
      tel: '', // 联系方式
      items: [{ name: '', code: '', number: '', size: '' }], // 初始状态下有一个空的对象
    },
  });

  // 使用 useFieldArray 管理数组字段
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* 其他非数组表单字段 */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          上架平台:
          <Controller
            name="platform"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          操作人:
          <Controller
            name="user"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          联系方式:
          <Controller
            name="tel"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
        </label>
      </div>

      {/* 动态数组表单，以表格形式展示 */}
      <table cellPadding="10" cellSpacing="0" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>商品名称</th>
            <th>型号代码</th>
            <th>数量</th>
            <th>规格</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <Controller
                  name={`items.${index}.name`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </td>
              <td>
                <Controller
                  name={`items.${index}.code`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </td>
              <td>
                <Controller
                  name={`items.${index}.number`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </td>
              <td>
                <Controller
                  name={`items.${index}.size`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </td>
              <td>
                <button type="button" onClick={() => remove(index)}>
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 添加新项按钮 */}
      <button type="button" onClick={() => append({ name: '', code: '', number: '', size: '' })}>
        添加商品
      </button>

      {/* 提交按钮 */}
      <button
        type="submit"
        onClick={() => {
          console.log(getValues());
        }}
        style={{ marginTop: '20px' }}
      >
        提交
      </button>
    </form>
  );
}

export default DynamicArrayForm;
