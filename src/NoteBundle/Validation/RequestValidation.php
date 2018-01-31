<?php


namespace NoteBundle\Validation;

use Symfony\Component\OptionsResolver\OptionsResolver;

class RequestValidation
{

    /**
     * @var string
     */
    private $type;

    /**
     * @var array
     */
    public $options;

    public function __construct(array $options = array())
    {
        $resolver =  new OptionsResolver();
        $this->configureOptions($resolver);

        $this->options = $resolver->resolve($options);
        $this->type = $this->options['type'];
        $this->noteValidation($resolver);
        $resolver->resolve($this->options);
    }

    /**
     *
     * @throws /InvalidArgumentException
     */

    private function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('id'     => '',
                                     'title'  => null,
                                     'note'   => '',
                                     'color'  => 'white',
                                     'status' => 'regular',
                                     'type'   => 'notes'));

        $resolver->setAllowedValues(array('type'   => array('notes', 'images', 'link'),
                                          'status' => array('regular', 'deleted', 'removed')));

        $resolver->setRequired(array('type', 'note'));
    }

    /**
     *
     * @throws /InvalidArgumentException
     */

    private function noteValidation(OptionsResolver $resolver)
    {
        if ($this->type == 'link' || $this->type == 'images')
        {
            //$resolver->setAllowedTypes(array('note' => array('url')));

            if ($this->type == 'images')
            {
                $resolver->setAllowedValues('note', function($value)
                {
                    $pattern = '/(https?:\/\/.*\.(?:png|jpg|jpeg))/';

                    if (preg_match($pattern, $value))
                    {
                        return true;
                    }

                    return false;
                });
            }
        }
    }
}